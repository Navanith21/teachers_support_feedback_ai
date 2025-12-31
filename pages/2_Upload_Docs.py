import streamlit as st

st.header("Upload Teacher Notes")

uploaded_files = st.file_uploader(
    "Upload PDF files",
    type=["pdf"],
    accept_multiple_files=True
)

if uploaded_files:
    st.success("Files uploaded successfully")
