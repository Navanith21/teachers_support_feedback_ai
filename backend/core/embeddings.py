import os
from langchain_ollama import OllamaEmbeddings

def get_embeddings():
    return OllamaEmbeddings(
        model="nomic-embed-text",
        base_url=os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
    )
