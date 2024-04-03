using System.Collections.Concurrent;

namespace ChatServiceSignalR.DataService
{
    public class SharedDb
    {
        private readonly ConcurrentDictionary<string, string> _userConnectionMap = new();
        public ConcurrentDictionary<string, string> UserConnectionMap => _userConnectionMap;
    }
}

