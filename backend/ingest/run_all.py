from backend.ingest.ingest_youtube import ingest_youtube_videos
from backend.ingest.ingest_teacher import ingest_teacher_content
from backend.rag import generate_teacher_feedback
from langchain.chat_models import ChatOpenAI

# Initialize LLM
llm = ChatOpenAI(model_name="gpt-4")

# Step 1: Process support videos
support_vectordb = ingest_youtube_videos()

# Step 2: Process teacher content
teacher_text = "Teacher lesson notes or transcript goes here"
teacher_vectordb = ingest_teacher_content(teacher_text)

# Step 3: Generate feedback
feedback = generate_teacher_feedback(teacher_vectordb, support_vectordb, teacher_text, llm)
print(feedback)
