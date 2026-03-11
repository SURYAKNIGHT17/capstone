from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class GenerateRequest(BaseModel):
    topic: str
    style: str
    num_pages: int
    emotion_intensity: str

class StatusResponse(BaseModel):
    comic_id: str
    status: str
    progress: int
    current_step: int
    step_label: str
    panels_completed: int
    panels_total: int
    estimated_seconds_remaining: Optional[int] = None

class PanelResponse(BaseModel):
    panel_number: int
    image_url: str
    dialogue: Optional[str] = None
    emotion: str
    camera_angle: str
    character: Optional[str] = None

class PageResponse(BaseModel):
    page_number: int
    panels: List[PanelResponse]

class ComicResponse(BaseModel):
    id: str
    title: str
    genre: Optional[str] = None
    style: str
    created_at: datetime
    num_pages: int
    pages: List[PageResponse]

class ComicHistoryItemResponse(BaseModel):
    id: str
    title: str
    cover_image: Optional[str] = None
    page_count: int
    style: str
    topic: str
    status: str
    created_at: datetime

class ComicHistoryResponse(BaseModel):
    comics: List[ComicHistoryItemResponse]
    total: int
    page: int
    pages: int
