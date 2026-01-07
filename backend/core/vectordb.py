from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM


def get_embeddings():
    return HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

def build_vectordb(chunks):
    if not chunks:
        raise ValueError("❌ No text chunks provided to build vector DB")

    embeddings = HuggingFaceEmbeddings()
    return FAISS.from_texts(chunks, embeddings)

def get_vectorstore(chunks, vectordb_path=None):
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    vectordb = FAISS.from_texts(chunks, embeddings)
    
    if vectordb_path:
        vectordb.save_local(vectordb_path)
    
    return vectordb
