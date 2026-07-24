import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import "./User.css";
import { setUser } from "../../authSlice";

function User() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const name = user?.userName || "";

  const [tempName, setTempName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [openAccount, setOpenAccount] = useState(null);
  const [openTransaction, setOpenTransaction] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [tempCategory, setTempCategory] = useState("");
  const [tempNote, setTempNote] = useState("");

  const [transactionsData, setTransactionsData] = useState([
    { id: 1, date: "27/02/20", description: "Golden Sun Bakery", amount: "$8.00", balance: "$298.00", type: "Electronic", category: "Food", note: "lorem ipsum" },
    { id: 2, date: "27/02/20", description: "Golden Sun Bakery", amount: "$8.00", balance: "$298.00", type: "Electronic", category: "Food", note: "lorem ipsum" },
    { id: 3, date: "27/02/20", description: "Golden Sun Bakery", amount: "$8.00", balance: "$298.00", type: "Electronic", category: "Food", note: "lorem ipsum" },
  ]);

  const handleSaveName = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: tempName }),
    });

    const data = await response.json();
    dispatch(setUser(data.body));
    setIsEditing(false);
  };

  const handleSaveCategory = (transactionId) => {
    setTransactionsData(transactionsData.map(t => 
      t.id === transactionId ? { ...t, category: tempCategory } : t
    ));
    setEditingCategory(null);
  };

  const handleSaveNote = (transactionId) => {
    setTransactionsData(transactionsData.map(t => 
      t.id === transactionId ? { ...t, note: tempNote } : t
    ));
    setEditingNote(null);
  };

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          {!isEditing ? (
            <>
              <h1>
                Welcome back
                <br />
                {user?.userName}!
              </h1>
              <button
                className="edit-button"
                onClick={() => {
                  setTempName(name);
                  setIsEditing(true);
                }}
              >
                Edit Name
              </button>
            </>
          ) : (
            <>
              <h2>Edit user info</h2>
              <div className="edit-form">
                <div className="input-row">
                  <label>User name:</label>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                </div>
                <div className="input-row">
                  <label>First name:</label>
                  <input
                    type="text"
                    value={user?.firstName || ''}
                    disabled
                  />
                </div>
                <div className="input-row">
                  <label>Last name:</label>
                  <input
                    type="text"
                    value={user?.lastName || ''}
                    disabled
                  />
                </div>
                <div className="button-row">
                  <button className="edit-button" onClick={handleSaveName}>
                    Save
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>

        <section 
          className={`account ${openAccount === 'checking' ? 'account-open' : ''}`}
          onClick={() => setOpenAccount(openAccount === 'checking' ? null : 'checking')}
          style={{cursor: 'pointer'}}
        >
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
        </section>
        {openAccount === 'checking' && (
          <div className="transactions-list">
            <div className="transactions-header">
              <span>Date</span>
              <span>Description</span>
              <span>Amount</span>
              <span>Balance</span>
              <span></span>
            </div>
            {transactionsData.map(t => (
              <div key={t.id}>
                <div 
                  className="transaction-item"
                  onClick={() => setOpenTransaction(openTransaction === t.id ? null : t.id)}
                  style={{cursor: 'pointer'}}
                >
                  <span>{t.date}</span>
                  <span>{t.description}</span>
                  <span>{t.amount}</span>
                  <span>{t.balance}</span>
                  <span>{openTransaction === t.id ? '▲' : '▼'}</span>
                </div>
                {openTransaction === t.id && (
                  <div className="transaction-details">
                    <div className="detail-row">
                      <span>Transaction type</span>
                      <span>{t.type}</span>
                    </div>
                    <div className="detail-row">
                      <span>Category</span>
                      {editingCategory === t.id ? (
                        <span>
                          <input 
                            type="text" 
                            value={tempCategory} 
                            onChange={(e) => setTempCategory(e.target.value)}
                            style={{marginRight: '10px'}}
                          />
                          <button onClick={() => handleSaveCategory(t.id)} style={{marginRight: '5px'}}>Save</button>
                          <button onClick={() => setEditingCategory(null)}>Cancel</button>
                        </span>
                      ) : (
                        <span>
                          {t.category} 
                          <button onClick={() => {
                            setTempCategory(t.category);
                            setEditingCategory(t.id);
                          }} style={{border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px'}}>
                            ✏️
                          </button>
                        </span>
                      )}
                    </div>
                    <div className="detail-row">
                      <span>Note</span>
                      {editingNote === t.id ? (
                        <span>
                          <input 
                            type="text" 
                            value={tempNote} 
                            onChange={(e) => setTempNote(e.target.value)}
                            style={{marginRight: '10px'}}
                          />
                          <button onClick={() => handleSaveNote(t.id)} style={{marginRight: '5px'}}>Save</button>
                          <button onClick={() => setEditingNote(null)}>Cancel</button>
                        </span>
                      ) : (
                        <span>
                          {t.note} 
                          <button onClick={() => {
                            setTempNote(t.note);
                            setEditingNote(t.id);
                          }} style={{border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px'}}>
                            ✏️
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <section 
          className={`account ${openAccount === 'savings' ? 'account-open' : ''}`}
          onClick={() => setOpenAccount(openAccount === 'savings' ? null : 'savings')}
          style={{cursor: 'pointer'}}
        >
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
        </section>
        {openAccount === 'savings' && (
          <div className="transactions-list">
            <div className="transactions-header">
              <span>Date</span>
              <span>Description</span>
              <span>Amount</span>
              <span>Balance</span>
              <span></span>
            </div>
            {transactionsData.map(t => (
              <div key={t.id}>
                <div 
                  className="transaction-item"
                  onClick={() => setOpenTransaction(openTransaction === t.id ? null : t.id)}
                  style={{cursor: 'pointer'}}
                >
                  <span>{t.date}</span>
                  <span>{t.description}</span>
                  <span>{t.amount}</span>
                  <span>{t.balance}</span>
                  <span>{openTransaction === t.id ? '▲' : '▼'}</span>
                </div>
                {openTransaction === t.id && (
                  <div className="transaction-details">
                    <div className="detail-row">
                      <span>Transaction type</span>
                      <span>{t.type}</span>
                    </div>
                    <div className="detail-row">
                      <span>Category</span>
                      {editingCategory === t.id ? (
                        <span>
                          <input 
                            type="text" 
                            value={tempCategory} 
                            onChange={(e) => setTempCategory(e.target.value)}
                            style={{marginRight: '10px'}}
                          />
                          <button onClick={() => handleSaveCategory(t.id)} style={{marginRight: '5px'}}>Save</button>
                          <button onClick={() => setEditingCategory(null)}>Cancel</button>
                        </span>
                      ) : (
                        <span>
                          {t.category} 
                          <button onClick={() => {
                            setTempCategory(t.category);
                            setEditingCategory(t.id);
                          }} style={{border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px'}}>
                            ✏️
                          </button>
                        </span>
                      )}
                    </div>
                    <div className="detail-row">
                      <span>Note</span>
                      {editingNote === t.id ? (
                        <span>
                          <input 
                            type="text" 
                            value={tempNote} 
                            onChange={(e) => setTempNote(e.target.value)}
                            style={{marginRight: '10px'}}
                          />
                          <button onClick={() => handleSaveNote(t.id)} style={{marginRight: '5px'}}>Save</button>
                          <button onClick={() => setEditingNote(null)}>Cancel</button>
                        </span>
                      ) : (
                        <span>
                          {t.note} 
                          <button onClick={() => {
                            setTempNote(t.note);
                            setEditingNote(t.id);
                          }} style={{border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px'}}>
                            ✏️
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <section 
          className={`account ${openAccount === 'credit' ? 'account-open' : ''}`}
          onClick={() => setOpenAccount(openAccount === 'credit' ? null : 'credit')}
          style={{cursor: 'pointer'}}
        >
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
        </section>
        {openAccount === 'credit' && (
          <div className="transactions-list">
            <div className="transactions-header">
              <span>Date</span>
              <span>Description</span>
              <span>Amount</span>
              <span>Balance</span>
              <span></span>
            </div>
            {transactionsData.map(t => (
              <div key={t.id}>
                <div 
                  className="transaction-item"
                  onClick={() => setOpenTransaction(openTransaction === t.id ? null : t.id)}
                  style={{cursor: 'pointer'}}
                >
                  <span>{t.date}</span>
                  <span>{t.description}</span>
                  <span>{t.amount}</span>
                  <span>{t.balance}</span>
                  <span>{openTransaction === t.id ? '▲' : '▼'}</span>
                </div>
                {openTransaction === t.id && (
                  <div className="transaction-details">
                    <div className="detail-row">
                      <span>Transaction type</span>
                      <span>{t.type}</span>
                    </div>
                    <div className="detail-row">
                      <span>Category</span>
                      {editingCategory === t.id ? (
                        <span>
                          <input 
                            type="text" 
                            value={tempCategory} 
                            onChange={(e) => setTempCategory(e.target.value)}
                            style={{marginRight: '10px'}}
                          />
                          <button onClick={() => handleSaveCategory(t.id)} style={{marginRight: '5px'}}>Save</button>
                          <button onClick={() => setEditingCategory(null)}>Cancel</button>
                        </span>
                      ) : (
                        <span>
                          {t.category} 
                          <button onClick={() => {
                            setTempCategory(t.category);
                            setEditingCategory(t.id);
                          }} style={{border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px'}}>
                            ✏️
                          </button>
                        </span>
                      )}
                    </div>
                    <div className="detail-row">
                      <span>Note</span>
                      {editingNote === t.id ? (
                        <span>
                          <input 
                            type="text" 
                            value={tempNote} 
                            onChange={(e) => setTempNote(e.target.value)}
                            style={{marginRight: '10px'}}
                          />
                          <button onClick={() => handleSaveNote(t.id)} style={{marginRight: '5px'}}>Save</button>
                          <button onClick={() => setEditingNote(null)}>Cancel</button>
                        </span>
                      ) : (
                        <span>
                          {t.note} 
                          <button onClick={() => {
                            setTempNote(t.note);
                            setEditingNote(t.id);
                          }} style={{border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px'}}>
                            ✏️
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default User;
