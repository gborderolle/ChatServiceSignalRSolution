using ChatServiceSignalR.DataService;
using ChatServiceSignalR.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatServiceSignalR.Hubs;

public class ChatHub : Hub
{
    private readonly SharedDb _sharedDb;

    public ChatHub(SharedDb sharedDb)
    {
        _sharedDb = sharedDb;
    }

    public async Task JoinChat(UserConnection userConnection)
    {
        await Clients.All.SendAsync("ReceivedMessage", "admin", $"{userConnection.Username} has joined the chat");
    }

    public async Task JoinSpecificChatRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
        _sharedDb.connections[Context.ConnectionId] = userConnection;
        await Clients.Group(userConnection.ChatRoom).SendAsync("ReceivedMessage", "admin", $"{userConnection.Username} has joined the chat room {userConnection.ChatRoom}");
    }

    public async Task SendMessage(string message)
    {
        if (_sharedDb.connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
        {
            await Clients.Group(userConnection.ChatRoom).SendAsync("ReceiveSpecificMessage", userConnection.Username, message);
        }
    }

}
