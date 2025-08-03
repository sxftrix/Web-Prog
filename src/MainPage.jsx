import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';

export default function MainPage({ db, user, appId, handleLogout }) {
    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [editingArticle, setEditingArticle] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [error, setError] = useState('');

    // Set up real-time articles listener for the authenticated user
    useEffect(() => {
        if (db && user) {
            const collectionPath = `artifacts/${appId}/users/${user}/articles`;
            const q = collection(db, collectionPath);
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const articlesData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setArticles(articlesData);
            }, (err) => {
                console.error("Error fetching articles:", err);
                setError("Failed to load articles.");
            });
            return () => unsubscribe();
        }
    }, [db, user, appId]);

    // Handle adding a new article
    const handleAddArticle = async (e) => {
        e.preventDefault();
        if (!title || !text || !db || !user) return;
        
        try {
            const article = { title, text };
            const collectionPath = `artifacts/${appId}/users/${user}/articles`;
            await addDoc(collection(db, collectionPath), article);
            setTitle('');
            setText('');
        } catch (e) {
            console.error("Error adding article:", e);
            setError("Failed to add article.");
        }
    };

    // Handle deleting an article
    const handleDeleteArticle = async (id) => {
        if (!db || !user) return;
        try {
            const docPath = `artifacts/${appId}/users/${user}/articles/${id}`;
            await deleteDoc(doc(db, docPath));
        } catch (e) {
            console.error("Error deleting article:", e);
            setError("Failed to delete article.");
        }
    };

    // Prepare to update an article
    const handleEditClick = (article) => {
        setEditingArticle(article);
        setShowUpdateForm(true);
    };

    // Handle updating an article
    const handleUpdateArticle = async (e) => {
        e.preventDefault();
        if (!editingArticle || !db || !user) return;

        try {
            const updatedArticle = {
                title: editingArticle.title,
                text: editingArticle.text
            };
            const docPath = `artifacts/${appId}/users/${user}/articles/${editingArticle.id}`;
            await setDoc(doc(db, docPath), updatedArticle, { merge: true });
            setEditingArticle(null);
            setShowUpdateForm(false);
        } catch (e) {
            console.error("Error updating article:", e);
            setError("Failed to update article.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="flex justify-between items-center pb-8 border-b-2 border-gray-700">
                    <h1 className="text-4xl font-bold text-teal-400">
                        Firebase React Blog
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm">
                            User ID: {user}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold shadow-lg transition duration-200"
                        >
                            Log Out
                        </button>
                    </div>
                </header>

                {error && (
                    <div className="bg-red-800 text-red-200 p-4 rounded-md shadow-inner text-center">
                        {error}
                    </div>
                )}

                {/* Article Creation Form */}
                <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-100 mb-6">
                        Create a New Article
                    </h2>
                    <form onSubmit={handleAddArticle} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-gray-300 font-medium mb-1">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="text" className="block text-gray-300 font-medium mb-1">Content</label>
                            <textarea
                                id="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows="4"
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 transition duration-200"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 rounded-md font-semibold text-lg shadow-md transition duration-200"
                        >
                            Add Article
                        </button>
                    </form>
                </div>

                {/* Articles List */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-100">
                        Your Articles
                    </h2>
                    {articles.length === 0 ? (
                        <p className="text-gray-400 text-center py-10">No articles found. Add one above!</p>
                    ) : (
                        <div className="space-y-6">
                            {articles.map((article) => (
                                <div key={article.id} className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                                    <h3 className="text-xl font-bold text-teal-300 mb-2">{article.title}</h3>
                                    <p className="text-gray-300 mb-4">{article.text}</p>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleEditClick(article)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold text-sm transition duration-200"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteArticle(article.id)}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold text-sm transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    {/* Update Form (conditionally rendered) */}
                                    {showUpdateForm && editingArticle?.id === article.id && (
                                        <div className="mt-6 p-4 bg-gray-700 rounded-md">
                                            <h4 className="text-lg font-semibold text-gray-200 mb-3">Update Article</h4>
                                            <form onSubmit={handleUpdateArticle} className="space-y-3">
                                                <div>
                                                    <label htmlFor="updateTitle" className="block text-gray-400 text-sm mb-1">New Title</label>
                                                    <input
                                                        id="updateTitle"
                                                        type="text"
                                                        value={editingArticle.title}
                                                        onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                                                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-teal-500 focus:border-teal-500 text-white transition duration-200"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="updateText" className="block text-gray-400 text-sm mb-1">New Content</label>
                                                    <textarea
                                                        id="updateText"
                                                        value={editingArticle.text}
                                                        onChange={(e) => setEditingArticle({ ...editingArticle, text: e.target.value })}
                                                        rows="3"
                                                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-teal-500 focus:border-teal-500 text-white transition duration-200"
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        type="submit"
                                                        className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-semibold transition duration-200"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowUpdateForm(false)}
                                                        className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm font-semibold transition duration-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
