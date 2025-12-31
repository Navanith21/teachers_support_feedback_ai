# pages/2_Ask_Notes.py

from backend.rag import get_answer

def main():
    while True:
        query = input("Ask a Teacher Notes question (or type 'exit' to quit): ")
        if query.lower() == "exit":
            break

        # Get answer from RAG system
        answer = get_answer(query)
        print("\nAnswer:", answer, "\n")


if __name__ == "__main__":
    main()
