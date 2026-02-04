from fastapi import FastAPI
from pydantic import BaseModel
import psycopg2
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

# ------------------------
# Allow Frontend (CORS)
# ------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow React
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# Database Connection
# ------------------------
def get_db():
    return psycopg2.connect(
        host="localhost",
        database="TeacherNotes",
        user="postgres",
        password="aiat"
    )


# ------------------------
# Data Model
# ------------------------
class Note(BaseModel):
    username: str
    school: str
    grade: str
    what_i_prepared: str
    what_i_did_well: str
    what_went_well: str
    where_to_improve: str
    created_date: str      # YYYY-MM-DD
    user_id: int
    what_homework_did_i_give: str


# ------------------------
# POST → Save Note
# ------------------------
@app.post("/save")
def save_note(note: Note):

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO teacher_notes (
            username,
            school,
            grade,
            what_i_prepared,
            what_i_did_well,
            what_went_well,
            where_to_improve,
            created_date,
            user_id,
            what_homework_did_i_give
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """, (
        note.username,
        note.school,
        note.grade,
        note.what_i_prepared,
        note.what_i_did_well,
        note.what_went_well,
        note.where_to_improve,
        note.created_date,
        note.user_id,
        note.what_homework_did_i_give
    ))

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Saved Successfully"}


# ------------------------
# GET → Get ALL Notes
# ------------------------
@app.get("/notes")
def get_all_notes():

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            username,
            school,
            grade,
            what_i_prepared,
            what_i_did_well,
            what_went_well,
            where_to_improve,
            created_date,
            user_id,
            what_homework_did_i_give
        FROM teacher_notes
        ORDER BY created_date DESC, id DESC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:
        result.append({
            "id": row[0],
            "username": row[1],
            "school": row[2],
            "grade": row[3],
            "what_i_prepared": row[4],
            "what_i_did_well": row[5],
            "what_went_well": row[6],
            "where_to_improve": row[7],
            "created_date": str(row[8]),
            "user_id": row[9],
            "what_homework_did_i_give": row[10]
        })

    return result

# ------------------------
# GET → Notes by Date Range ✅
# ------------------------
@app.get("/notes-by-date")
def get_notes_by_date(from_date: str, to_date: str):

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            username,
            school,
            grade,
            what_i_prepared,
            what_i_did_well,
            what_went_well,
            where_to_improve,
            created_date,
            user_id,
            what_homework_did_i_give
        FROM teacher_notes
        WHERE created_date BETWEEN %s AND %s
        ORDER BY created_date DESC
    """, (from_date, to_date))

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:
        result.append({
            "id": row[0],
            "username": row[1],
            "school": row[2],
            "grade": row[3],
            "what_i_prepared": row[4],
            "what_i_did_well": row[5],
            "what_went_well": row[6],
            "where_to_improve": row[7],
            "created_date": str(row[8]),
            "user_id": row[9],
            "what_homework_did_i_give": row[10]
        })

    return result


# ------------------------
# GET → One Note
# ------------------------
@app.get("/notes/{id}")
def get_note(id: int):

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT * FROM teacher_notes
        WHERE id = %s
    """, (id,))

    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        return {"error": "Note not found"}

    return {
        "id": row[0],
        "username": row[1],
        "school": row[2],
        "grade": row[3],
        "what_i_prepared": row[4],
        "what_i_did_well": row[5],
        "what_went_well": row[6],
        "where_to_improve": row[7],
        "created_date": str(row[8]),
        "user_id": row[9],
        "what_homework_did_i_give": row[10]
    }


# ------------------------
# PUT → Update
# ------------------------
@app.put("/notes/{id}")
def update_note(id: int, note: Note):

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        UPDATE teacher_notes
        SET
            username = %s,
            school = %s,
            grade = %s,
            what_i_prepared = %s,
            what_i_did_well = %s,
            what_went_well = %s,
            where_to_improve = %s,
            created_date = %s,
            user_id = %s,
            what_homework_did_i_give = %s
        WHERE id = %s
    """, (
        note.username,
        note.school,
        note.grade,
        note.what_i_prepared,
        note.what_i_did_well,
        note.what_went_well,
        note.where_to_improve,
        note.created_date,
        note.user_id,
        note.what_homework_did_i_give,
        id
    ))

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Updated Successfully"}


# ------------------------
# DELETE → Delete
# ------------------------
@app.delete("/notes/{id}")
def delete_note(id: int):

    conn = get_db()
    cur = conn.cursor()

    cur.execute("DELETE FROM teacher_notes WHERE id = %s", (id,))

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Deleted Successfully"}
