from app import app, connect_db
from models import db, Cupcake

app.app_context().push()
db.drop_all()
db.create_all()

c1 = Cupcake(
    flavor="cherry",
    size="large",
    rating=5,
)

c2 = Cupcake(
    flavor="chocolate",
    size="small",
    rating=9,
    image="https://www.bakedbyrachel.com/wp-content/uploads/2018/01/chocolatecupcakesccfrosting1_bakedbyrachel.jpg"
)

c3 = Cupcake(
    flavor="cookie&cream",
    size="medium",
    rating=10,
)

db.session.add_all([c1, c2, c3])
db.session.commit()