from backend.core.loader import load_support_video
from backend.core.embeddings import build_vectordb
from backend.core.splitter import get_splitter


YOUTUBE_URLS = [
    "https://www.youtube.com/watch?v=oEUFRws-RLU",
]

support_vectordb = ingest_youtube_videos(YOUTUBE_URLS)


def ingest_youtube_videos():
    texts = []

    # 1️⃣ Load transcripts
    for url in YOUTUBE_URLS:
        transcript = load_support_video(url)
        if transcript:
            texts.append(transcript)
        else:
            print(f"⚠️ Skipped video (no transcript): {url}")

    if not texts:
        raise ValueError("❌ No YouTube transcripts could be loaded")

    # 2️⃣ Combine all transcripts
    full_text = "\n\n".join(texts)

    # 3️⃣ Split text into chunks
    splitte
if __name__ == "__main__":
    print("Running YouTube ingestion test...")
    vectordb = ingest_youtube_videos()
    print("✅ YouTube FAISS vectorstore built successfully")
