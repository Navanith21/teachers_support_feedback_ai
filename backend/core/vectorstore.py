from langchain_chroma import Chroma



PERSIST_DIR = "data/chroma"

def get_vectorstore(embeddings):
    return Chroma(
        persist_directory=PERSIST_DIR,
        embedding_function=embeddings
    )
