# backend/core/vectordb.py
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

def get_vectorstore(docs, embeddings=None):
    # If no embeddings are passed, create a default one
    if embeddings is None:
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
    return FAISS.from_documents(docs, embeddings)
