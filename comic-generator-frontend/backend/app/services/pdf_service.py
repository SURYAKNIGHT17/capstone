import os
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
from sqlalchemy.orm import Session
from app.models.database import Comic
from app.config import settings

class PDFService:
    def __init__(self):
        template_dir = os.path.join(os.path.dirname(__file__), "..", "templates")
        os.makedirs(template_dir, exist_ok=True)
        self.jinja_env = Environment(loader=FileSystemLoader(template_dir))

    def get_or_generate_pdf(self, db: Session, comic_id: str, base_url: str):
        pdf_path = f"{settings.PDF_STORAGE_PATH}/{comic_id}.pdf"
        if os.path.exists(pdf_path):
            return pdf_path
            
        comic = db.query(Comic).filter(Comic.id == comic_id).first()
        if not comic or comic.status != "completed":
            return None
            
        try:
            template = self.jinja_env.get_template("comic_pdf.html")
        except:
            # Create a default template if not found
            self._create_default_template()
            template = self.jinja_env.get_template("comic_pdf.html")
            
        # Re-fetch page/panel structured data for the template
        pages = []
        for p in sorted(comic.pages, key=lambda x: x.page_number):
            panels = sorted(p.panels, key=lambda x: x.panel_number)
            pages.append({"page_number": p.page_number, "panels": panels})
            
        html_out = template.render(comic=comic, pages=pages, base_url=base_url)
        HTML(string=html_out, base_url=base_url).write_pdf(pdf_path)
        
        comic.pdf_cached = True
        db.commit()
        
        return pdf_path
        
    def _create_default_template(self):
        template_dir = os.path.join(os.path.dirname(__file__), "..", "templates")
        template_content = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>{{ comic.title }}</title>
            <style>
                @page { size: A4; margin: 10mm; }
                body { font-family: sans-serif; }
                .cover { text-align: center; margin-top: 50mm; page-break-after: always; }
                .comic-page { page-break-after: always; }
                .panel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .panel { border: 1px solid #000; padding: 5px; text-align: center; }
                .panel img { max-width: 100%; height: auto; }
                .dialogue { font-style: italic; background: #f9f9f9; padding: 5px; margin-top: 5px; border-radius: 5px; border: 1px solid #ccc;}
            </style>
        </head>
        <body>
            <div class="cover">
                <h1>{{ comic.title }}</h1>
                <p>Genre: {{ comic.genre }} | Style: {{ comic.style }}</p>
            </div>
            {% for page in pages %}
            <div class="comic-page">
                <h3>Page {{ page.page_number }}</h3>
                <div class="panel-grid">
                {% for panel in page.panels %}
                    <div class="panel">
                        <img src="{{ base_url }}{{ panel.image_url }}" />
                        {% if panel.dialogue %}
                        <div class="dialogue">{{ panel.dialogue }}</div>
                        {% endif %}
                    </div>
                {% endfor %}
                </div>
            </div>
            {% endfor %}
        </body>
        </html>
        """
        with open(os.path.join(template_dir, "comic_pdf.html"), "w", encoding="utf-8") as f:
            f.write(template_content)

pdf_service = PDFService()
