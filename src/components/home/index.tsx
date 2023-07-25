import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { setActiveChat, setChatMessages } from "../../Redux/Slices/user.slice";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { dummyChatMessages } from '../../utils/constant';

function Home() {
    const dispatch: Dispatch<any> = useDispatch();

    const userList = useSelector((state: any) => state.user?.userList);
    const activeChat = useSelector((state: any) => state.user?.activeChat);
    const chatMessages = useSelector((state: any) => state.user?.chatMessages);
    const myProfile = useSelector((state: any) => state.user?.myProfile);

    const [msg, setMsg] = useState<any>("");
    const sendMsg = (e: any) => {
        e.preventDefault();
        dispatch(setChatMessages([...chatMessages, {
            msg: msg,
            from: 'me',
            time: 'just now'
        }]));
        setMsg('')
    }

    useEffect(() => {
        dispatch(setChatMessages(dummyChatMessages));
    }, [activeChat]);


    return (
        <div className="App">
            <div className="app">

                <div className="wrapper">
                    <div className="conversation-area">
                        <div className="logo-div">
                            <div className="logo">
                                <svg viewBox="0 0 513 513" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M256.025.05C117.67-2.678 3.184 107.038.025 245.383a240.703 240.703 0 0085.333 182.613v73.387c0 5.891 4.776 10.667 10.667 10.667a10.67 10.67 0 005.653-1.621l59.456-37.141a264.142 264.142 0 0094.891 17.429c138.355 2.728 252.841-106.988 256-245.333C508.866 107.038 394.38-2.678 256.025.05z" />
                                    <path d="M330.518 131.099l-213.825 130.08c-7.387 4.494-5.74 15.711 2.656 17.97l72.009 19.374a9.88 9.88 0 007.703-1.094l32.882-20.003-10.113 37.136a9.88 9.88 0 001.083 7.704l38.561 63.826c4.488 7.427 15.726 5.936 18.003-2.425l65.764-241.49c2.337-8.582-7.092-15.72-14.723-11.078zM266.44 356.177l-24.415-40.411 15.544-57.074c2.336-8.581-7.093-15.719-14.723-11.078l-50.536 30.744-45.592-12.266L319.616 160.91 266.44 356.177z" fill="#fff" />
                                </svg>

                            </div>
                            <div className="msg-detail">
                                <h3>QuickChat</h3>
                            </div>
                        </div>
                        <div className="detail-area-header">
                            <div className="msg-profile group">
                                <img className="msg-profile" src={myProfile.profilePic} alt="" />
                            </div>
                            <div className="detail-title">{myProfile.firstName} {myProfile.lastName}</div>
                            <div className="detail-subtitle">{myProfile.title}</div>
                            <div className="detail-buttons">
                                <button className="detail-button">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    Call Group
                                </button>
                            </div>
                        </div>
                        <hr />
                        {userList.map((user: any, index: number) => (
                            <div className={`msg ${user.online ? 'online' : ''} ${user.id === activeChat.id ? 'active' : ''}`} key={index} onClick={() => dispatch(setActiveChat(user))}>
                                <img className="msg-profile" src={user.profilePic} alt="" />
                                <div className="msg-detail">
                                    <div className="msg-username">{user.firstName} {user.lastName}</div>
                                    <div className="msg-content">
                                        <span className="msg-message">{user.lastMessage}</span>
                                        <span className="msg-date">{user.lastMsgTime}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-area">
                        <div className="chat-area-main">
                            {chatMessages.map((chat: any, index: number) => (
                                <div className={`chat-msg ${chat.from === 'me' ? 'owner' : ''}`} key={index}>
                                    <div className="chat-msg-profile">
                                        <img className="chat-msg-img" src={chat.from === "me" ? myProfile.profilePic : activeChat.profilePic} alt="" />
                                        <div className="chat-msg-date">{chat.time}</div>
                                    </div>
                                    <div className="chat-msg-content">
                                        <div className="chat-msg-text">{chat.msg}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="chat-area-footer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-paperclip">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                            </svg>
                            <form onSubmit={sendMsg} className='comment-form'>
                                <input value={msg} onChange={(e) => setMsg(e.target.value)} type="text" placeholder="Type something here..." required />
                                <button className="detail-button" type='submit'>
                                    Send
                                    <i className="fa-regular fa-paper-plane"></i>
                                </button>
                            </form>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-smile">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                            </svg>
                        </div>
                    </div>
                    <div className="detail-area">
                        <div className="detail-area-header">
                            <div className="msg-profile group">
                                <img className="msg-profile" src={myProfile.profilePic} alt="" />
                            </div>
                            <div className="detail-subtitle"><i className="fa-regular fa-envelope"></i> henryboyd@gmail.com</div>
                            <div className="detail-subtitle"><i className="fa-sharp fa-regular fa-circle-user"></i>Henry Boyd</div>
                            <div className="detail-buttons">
                                <button className="detail-button">
                                    Archive
                                    <i className="fa-solid fa-box-archive"></i>
                                </button>

                            </div>
                        </div>
                        <div className="detail-changes">
                            <div className="detail-buttons">
                                <button className="detail-button">
                                    <i className="fa-regular fa-clock"></i>
                                    <h3>13 h</h3>
                                </button>
                                <button className="detail-button">
                                    <i className="fa-solid fa-users"></i>
                                    <h3>188</h3>
                                </button>
                            </div>
                            <div className="detail-buttons">
                                <button className="detail-button">
                                    <i className="fa-regular fa-calendar"></i>
                                    <h3>13 h</h3>
                                </button>
                                <button className="detail-button">
                                    <i className="fa-regular fa-message"></i>
                                    <h3>188</h3>
                                </button>
                            </div>
                        </div>
                        <div className="detail-photos">
                            <div className="detail-photo-title">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-image">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                                Shared photos
                            </div>
                            <div className="detail-photo-grid">
                                <img src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80" />
                                <img src="https://images.unsplash.com/photo-1516085216930-c93a002a8b01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />
                                <img src="https://images.unsplash.com/photo-1458819714733-e5ab3d536722?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80" />
                                <img src="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2287&q=80" />
                                <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2247&q=80" />
                                <img src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80" />
                                <img src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80" />
                                <img src="https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2249&q=80" />
                                <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2309&q=80" />

                                <img src="https://images.unsplash.com/photo-1473170611423-22489201d919?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80" />
                                <img src="https://images.unsplash.com/photo-1579613832111-ac7dfcc7723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />
                                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2189&q=80" />
                            </div>
                            <div className="view-more">View More</div>
                        </div>
                        <a href="https://twitter.com/AysnrTrkk" className="follow-me" target="_blank">
                            <span className="follow-text">
                                <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                                Follow me on Twitter
                            </span>
                            <span className="developer">
                                <img src="https://pbs.twimg.com/profile_images/1253782473953157124/x56UURmt_400x400.jpg" />
                                Aysenur Turk — @AysnrTrkk
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
