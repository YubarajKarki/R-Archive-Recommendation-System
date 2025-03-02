# R-Archive  

## 📌 Project Overview  
R-Archive is a **web-based digital library** that allows users to **archive, access, and rate educational documents** while leveraging **machine learning** to provide personalized recommendations. The system uses **K-Means clustering** and **collaborative filtering** to enhance resource discoverability, ensuring an engaging and user-friendly learning experience.  

---

## 🚀 Features  
✅ **User Registration & Authentication** – Secure login system for personalized access.  
✅ **Document Upload & Management** – Users can archive and organize digital resources.  
✅ **Personalized Recommendations** – AI-driven suggestions based on user preferences.  
✅ **Search & Rating System** – Find and rate documents to improve recommendations.  
✅ **Interactive UI** – Built with **React** for a seamless user experience.  

---

## 🛠️ Tech Stack  
### **Frontend:**  
- **React.js** – Component-based UI development.  
- **HTML & Tailwind CSS** – Responsive styling.  

### **Backend:**  
- **Django & Django REST Framework** – API development.  
- **PostgreSQL** – Relational database for managing user interactions.  

### **Machine Learning:**  
- **K-Means Clustering** – Groups users based on preferences.  
- **Collaborative Filtering** – Suggests resources based on user behavior.  
- **Elbow Method & Euclidean Distance** – Optimizes recommendation accuracy.  

---

## ⚙️ Installation & Setup  
### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/your-username/R-Archive.git
cd R-Archive
```
2️⃣ Backend Setup (Django API)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
---

3️⃣ Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```
---


## 📊 Project Architecture  
```plaintext
R-Archive/
│── backend/              # Django backend
│   ├── api/              # API for document management
│   ├── ml/               # Machine learning models
│   ├── models.py         # Database schema
│   ├── serializers.py    # API data formatting
│── frontend/             # React frontend
│   ├── components/       # UI components
│   ├── pages/            # Main app pages
│   ├── App.js            # Entry point
│── README.md             # Documentation
│── requirements.txt      # Backend dependencies
│── package.json          # Frontend dependencies
│── .gitignore            # Files to ignore in Git
```

---

📈 Machine Learning Workflow
1. User Activity Tracking – System collects user ratings & resource interactions.
2. Preprocessing Data – Cleans and formats user-resource interaction data.
3. K-Means Clustering – Groups users based on behavior.
4. Elbow Method – Determines optimal clusters.
5. Recommendation Engine – Suggests relevant documents.

---

📄 API Endpoints
Method   | Endpoint              | Description  
---------|-----------------------|------------------------------  
POST     | /api/register/        | User registration  
POST     | /api/login/           | User authentication  
GET      | /api/documents/       | Fetch all documents  
POST     | /api/upload/          | Upload new document  
GET      | /api/recommendations/ | Get recommended resources  


---

🔗 Contributing
🙌 We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
git checkout -b feature-name
    ```
3. Commit changes:
```bash
git commit -m "Added new feature"
```
4. Push to the branch:
```bash
git push origin feature-name
```
5. Create a Pull Request.

---

📜 License
This project is licensed under the MIT License – feel free to use and improve it!

---

📩 Contact & Support
For any issues or feature requests, open an issue in the repository or reach out via yubrazkarkee7917@gmail.com.
