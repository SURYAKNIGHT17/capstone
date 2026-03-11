from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Comic(Base):
    __tablename__ = "comics"
    id               = Column(String, primary_key=True)       # UUID
    title            = Column(String, default="Untitled Comic")
    genre            = Column(String)
    style            = Column(String)                         # manga|western|cartoon|realistic
    topic            = Column(String)
    num_pages        = Column(Integer)
    status           = Column(String, default="processing")   # processing|completed|failed|cancelled
    progress         = Column(Integer, default=0)
    panels_completed = Column(Integer, default=0)
    panels_total     = Column(Integer, default=0)
    current_step     = Column(Integer, default=1)
    error_message    = Column(Text, nullable=True)
    created_at       = Column(DateTime, default=datetime.utcnow)
    completed_at     = Column(DateTime, nullable=True)
    pdf_cached       = Column(Boolean, default=False)         
    
    pages            = relationship("Page", back_populates="comic", cascade="all, delete-orphan")

class Page(Base):
    __tablename__ = "pages"
    id          = Column(Integer, primary_key=True, autoincrement=True)
    comic_id    = Column(String, ForeignKey("comics.id", ondelete="CASCADE"))
    page_number = Column(Integer)
    
    comic       = relationship("Comic", back_populates="pages")
    panels      = relationship("Panel", back_populates="page", cascade="all, delete-orphan")

class Panel(Base):
    __tablename__ = "panels"
    id           = Column(Integer, primary_key=True, autoincrement=True)
    page_id      = Column(Integer, ForeignKey("pages.id", ondelete="CASCADE"))
    panel_number = Column(Integer)
    image_url    = Column(String)       # e.g. /api/images/abc123/page1/panel1.png
    image_path   = Column(String)       # local filesystem path
    dialogue     = Column(Text, nullable=True)
    emotion      = Column(String, default="neutral")
    camera_angle = Column(String, default="medium")
    character    = Column(String, nullable=True)
    image_prompt = Column(Text, nullable=True)   # stored for potential regeneration
    
    page         = relationship("Page", back_populates="panels")
