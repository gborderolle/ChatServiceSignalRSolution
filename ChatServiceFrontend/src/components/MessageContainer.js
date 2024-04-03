const MessageContainer = ({ messages }) => {
  return (
    <div>
      <h1>Chat Room</h1>
      <ul>
        {messages.map((message, index) => (
          <table striped bordered hover>
            <tr>
              <td>{message.username}</td>
              <td>{message.message}</td>
            </tr>
          </table>
        ))}
      </ul>
    </div>
  );
};

export default MessageContainer;
