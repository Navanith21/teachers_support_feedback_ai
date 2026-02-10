import sys
import os

from backend.db.pgdatabase import engine
from backend.models.models import User
# from backend.api.deps import engine
# from backend.models.teacher_notes import Base

User.metadata.create_all(bind=engine)

print("Tables created successfully")


# sys.path.append(os.path.dirname(os.path.dirname(__file__)))



# Base.metadata.create_all(bind=engine)
