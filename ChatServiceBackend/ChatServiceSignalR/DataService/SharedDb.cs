using System.Collections.Concurrent;
using ChatServiceSignalR.Models;

namespace ChatServiceSignalR.DataService
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new();
        public ConcurrentDictionary<string, UserConnection> connections => _connections;
    }
}

