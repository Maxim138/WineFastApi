from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, desc
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

DATABASE_URL = "postgresql://postgres:123@localhost/WineProducts"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True, nullable=False)

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True, nullable=False)
    image = Column(String, nullable=False)
    description = Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class WineCreate(BaseModel):
    name: str
    img: str
    description: str
    country_id: int

@app.get("/categories")
def categories(db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return categories

@app.get("/products/{category_id}")
def products(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    products = db.query(Product).filter(Product.category_id == category_id).all()
    return products, category

@app.get("/recent_products")
def recent_products(db: Session = Depends(get_db)):
    products = db.query(Product).order_by(desc(Product.id)).limit(6).all()
    return products

@app.get("/product/{product_id}")
def products(product_id: int, db: Session = Depends(get_db)):
    product, category = db.query(Product, Category).join(Category, Product.category_id == Category.id).filter(Product.id == product_id).first()
    return product, category

@app.get("/products")
def all_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

@app.post("/create")
def create_wine(wine: WineCreate, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == wine.country_id).first()
    if category:
        db_wine = Product(name=wine.name, image=wine.img, description=wine.description, category_id=wine.country_id)
        db.add(db_wine)
        db.commit()
        db.refresh(db_wine)
        return db_wine