# backend/rag.py

from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_community.vectorstores import FAISS
from backend.ingest.ingest_youtube import ingest_youtube_videos
from backend.ingest.ingest_teacher import ingest_teacher_content
from langchain_ollama import OllamaLLM



# ----------------------------
# Function 1: Get Answer
# ----------------------------
def get_answer(query: str, vectordb_path: str = "vectorstore") -> str:
    """
    Retrieve relevant documents from FAISS vectorstore (PDF, TXT, YouTube)
    and generate an answer using Ollama LLM.
    """
    

    # Initialize embeddings
    embeddings = OllamaEmbeddings(model="nomic-embed-text")

    # Load FAISS vectorstore
    vectordb = FAISS.load_local(
        vectordb_path,
        embeddings,
        allow_dangerous_deserialization=True
    )

    # Convert to retriever
    retriever = vectordb.as_retriever()

    # Retrieve documents
    docs = retriever._get_relevant_documents(query, run_manager=None)

    # Initialize LLM
    llm = OllamaLLM(model="llama3.2:1b")

    # Combine retrieved context
    context_text = "\n\n".join([doc.page_content for doc in docs])

    # Build prompt
    prompt = (
        f"Answer the question based on the context below. "
        f"If unknown, say you don't know.\n\n"
        f"Context:\n{context_text}\n\n"
        f"Question:\n{query}"
    )

    # Generate answer
    response = llm.invoke(prompt)
    return response


# ----------------------------
# Function 2: Generate Teacher Feedback
# ----------------------------
def generate_teacher_feedback(teacher_vectordb, support_vectordb, teacher_text, llm):
    """
    Generate constructive feedback for teachers using reference videos or materials.
    """

    # Retrieve relevant support content
    refs = support_vectordb.similarity_search(teacher_text, k=4)
    reference = "\n\n".join(r.page_content for r in refs)

    prompt = f"""
You are an expert teaching mentor.

Teacher Content:
{teacher_text}

Reference Teaching Materials:
{reference}

Provide constructive feedback to support the teacher:
1. Strengths in the approach
2. Weak or missing concepts
3. Suggestions to improve explanation clarity
4. Examples, analogies, or pedagogical improvements
Be positive and supportive.
"""

    return llm.invoke(prompt)


# ----------------------------
# Runnable test block
# ----------------------------
if __name__ == "__main__":

    # Initialize Ollama LLM
    llm = OllamaLLM(model="llama3.2:1b")

    # Step 1: Ingest support videos
    print("📺 Ingesting support videos...")
    support_vectordb = ingest_youtube_videos()

    # Step 2: Ingest teacher content
    teacher_text = "Paste teacher lesson notes or transcript here"
    teacher_vectordb = ingest_teacher_content(teacher_text)

    # Step 3: Generate teacher feedback
    print("📝 Generating teacher feedback...")
    feedback = generate_teacher_feedback(
        teacher_vectordb,
        support_vectordb,
        teacher_text,
        llm
    )

    print("\n=== Teacher Feedback ===\n")
    print(feedback)

    # Step 4: Test get_answer
    question = "What is AI?"
    print("\n=== Sample get_answer Output ===\n")
    print(get_answer(question))
