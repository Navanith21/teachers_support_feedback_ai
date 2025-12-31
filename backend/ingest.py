from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import FAISS
import os
import uuid

# Document class compatible with FAISS
class Document:
    def __init__(self, page_content, metadata=None, id=None):
        self.page_content = page_content
        self.metadata = metadata or {}
        self.id = id or str(uuid.uuid4())

def ingest_documents(docs):
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    vectordb = FAISS.from_documents(docs, embeddings)

    os.makedirs("vectorstore", exist_ok=True)
    vectordb.save_local("vectorstore")
    print("Vector store created successfully!")

if __name__ == "__main__":
    docs = [
        Document("Artificial Intelligence is the simulation of human intelligence in machines."),
        Document("Machine learning is a subset of AI."),
        Document("Deep learning uses neural networks to learn from data."),
    ]
    ingest_documents(docs)
