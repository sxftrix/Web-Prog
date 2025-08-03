import React, { useState, useEffect } from 'react';
import './index.css';
import { collection, addDoc, query, where, onSnapshot, orderBy, Timestamp } from 'firebase/firestore'; // Import Timestamp

export default function Dashboard({ user, handleLogout, db }) {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [addingArticle, setAddingArticle] = useState(false);

  useEffect(() => {
    if (!user || !db) {
      setLoadingArticles(false);
      return;
    }

    const q = query(
      collection(db, "articles"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedArticles = [];
      querySnapshot.forEach((doc) => {
        fetchedArticles.push({ id: doc.id, ...doc.data() });
      });
      setArticles(fetchedArticles);
      setLoadingArticles(false);
    }, (error) => {
      console.error("Error fetching articles:", error);
      setLoadingArticles(false);
    });

    return () => unsubscribe();
  }, [user, db]);

  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add an article.");
      return;
    }
    setAddingArticle(true);
    try {
      await addDoc(collection(db, "articles"), {
        title: articleTitle,
        content: articleContent,
        userId: user.uid,
        createdAt: Timestamp.fromDate(new Date()), // <--- CHANGE IS HERE: Use Timestamp.fromDate()
      });
      setArticleTitle('');
      setArticleContent('');
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Failed to add article: " + error.message);
    } finally {
      setAddingArticle(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Freedom Wall</h1>
        <div className="user-info">
          <span className="user-id">User ID: {user?.uid || 'N/A'}</span>
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="create-article-section">
          <h2 className="section-title">Express your Feelings Freely</h2>
          <form onSubmit={handleAddArticle} className="article-form">
            <label htmlFor="articleTitle" className="form-label">Title</label>
            <input
              type="text"
              id="articleTitle"
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              className="form-input"
              placeholder="Rant title..."
              required
              disabled={addingArticle}
            />

            <label htmlFor="articleContent" className="form-label">Content</label>
            <textarea
              id="articleContent"
              value={articleContent}
              onChange={(e) => setArticleContent(e.target.value)}
              className="form-textarea"
              placeholder="Let it all out here..."
              rows="5"
              required
              disabled={addingArticle}
            ></textarea>

            <button type="submit" className="add-article-button" disabled={addingArticle}>
              {addingArticle ? 'Ranting...' : 'Rant'}
            </button>
          </form>
        </section>

        <section className="your-articles-section">
          <h2 className="section-title">Your Articles</h2>
          {loadingArticles ? (
            <p className="loading-message">Loading articles...</p>
          ) : articles.length === 0 ? (
            <p className="no-articles-message">No articles found. Add one above!</p>
          ) : (
            <div className="articles-list">
              {articles.map(article => (
                <div key={article.id} className="article-item">
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}