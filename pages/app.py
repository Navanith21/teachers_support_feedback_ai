import streamlit as st

st.set_page_config(page_title="Notes Assistant", layout="centered")

st.title("📚 Notes Assistant")
st.markdown("Welcome to the **Notes Assistant App**.\n\nChoose what you want to do:")

col1, col2 = st.columns(2)

with col1:
    st.subheader("🧠 Ask Notes")
    st.write("Ask questions from uploaded notes.")
    st.write("➡️ Use the sidebar to navigate to the 'Ask Notes' page.")

with col2:
    st.subheader("📤 Upload Notes")
    st.write("Upload PDFs or text files.")
    st.write("➡️ Use the sidebar to navigate to the 'Upload Notes' page.")

st.divider()
st.info("Use the sidebar to navigate between pages anytime.")
