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
        await Clients.All.SendAsync("ReceivedMessage", "Admin", $"{userConnection.Username} has joined the chat");
    }

    public async Task JoinSpecificChatRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
        await Clients.Group(userConnection.ChatRoom).SendAsync("ReceivedMessage", "Admin", $"{userConnection.Username} has joined the chat room");
    }

    public async Task SendMessage(string message)
    {
        if(_sharedDb.UserConnectionMap.TryGetValue(Context.ConnectionId, out var username))
        {
            await Clients.All.SendAsync("ReceivedMessage", username, message);
        }
    }

}
