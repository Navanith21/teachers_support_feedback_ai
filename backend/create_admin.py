from backend.db.pgdatabase import SessionLocal
from backend.models.models import User
from backend.admin.security import hash_password

def create_admin():
    db = SessionLocal()

    username = "admin"
    email = "admin@gmail.com"
    password = "admin@123"   # change later

    # Check if admin already exists
    if db.query(User).filter(User.username == username).first():
        print("Admin already exists")
        return

    admin = User(
        username=username,
        email=email,
        password_hash=hash_password(password),
        role="admin"
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    print("Admin created successfully")
    print("Username:", username)
    print("Password:", password)

if __name__ == "__main__":
    create_admin()
