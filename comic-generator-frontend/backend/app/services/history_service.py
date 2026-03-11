from sqlalchemy.orm import Session
from app.models.database import Comic
import shutil
import os

def get_history(db: Session, page: int = 1, limit: int = 12, sort: str = "newest", search: str = None):
    query = db.query(Comic).filter(Comic.status == "completed")
    
    if search:
        query = query.filter(Comic.title.ilike(f"%{search}%") |
                             Comic.topic.ilike(f"%{search}%"))
                             
    sort_map = {
        "newest":    Comic.created_at.desc(),
        "oldest":    Comic.created_at.asc(),
        "title_az":  Comic.title.asc(),
        "title_za":  Comic.title.desc(),
        "most_pages": Comic.num_pages.desc()
    }
    
    query = query.order_by(sort_map.get(sort, Comic.created_at.desc()))
    
    total = query.count()
    comics = query.offset((page - 1) * limit).limit(limit).all()
    
    return {
        "comics": comics,
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit if limit > 0 else 1
    }

def delete_comic(db: Session, comic_id: str):
    comic = db.query(Comic).filter(Comic.id == comic_id).first()
    if not comic:
        return False
        
    # Delete images folder
    shutil.rmtree(f"static/images/{comic_id}", ignore_errors=True)
    
    # Delete cached PDF
    pdf_path = f"static/exports/{comic_id}.pdf"
    if os.path.exists(pdf_path):
        os.remove(pdf_path)
        
    db.delete(comic)
    db.commit()
    return True
