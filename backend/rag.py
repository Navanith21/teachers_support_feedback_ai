# backend/rag.py
import sys
import os
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(ROOT_DIR)
from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_community.vectorstores import FAISS


def get_answer(query: str):
    return f"Answer for: {query}"


from backend.rag import get_answer


def get_answer(query: str) -> str:
    """
    Retrieve relevant documents from the FAISS vector store and
    generate an answer using Ollama LLM.
    """
    
    # Initialize embeddings
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    
    # Load local FAISS vectorstore
    vectordb = FAISS.load_local(
        "vectorstore",
        embeddings,
        allow_dangerous_deserialization=True
    )
    
    # Convert to retriever
    retriever = vectordb.as_retriever()
    
    # Retrieve documents (use _get_relevant_documents with run_manager=None)
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

# Test block
if __name__ == "__main__":
    question = "What is AI?"
    answer = get_answer(question)
    print(answer)
