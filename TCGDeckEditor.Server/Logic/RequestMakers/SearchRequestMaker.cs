using System.Reflection;
using TCGDeckEditor.Server.Requests;

namespace TCGDeckEditor.Server.Logic.RequestMakers;

public class SearchRequestMaker : ISearchRequestMaker
{
    private static string TCG_API = "https://apitcg.com/api/one-piece/cards?";
    
    public Task<string> CreateSearchRequest(SearchCardsRequest request)
    {
        Type type = request.GetType();
        PropertyInfo[] properties = type.GetProperties();
        
        foreach (var property in properties)
        {
            string name = property.Name;
            string? value = property.GetValue(request)?.ToString();

            if (value != null)
            {
                TCG_API += $"{name}={value}&";
            }
        }
        
        return Task.FromResult(TCG_API.Remove(TCG_API.Length - 1, 1));
    }
}

public interface ISearchRequestMaker
{
    Task<string> CreateSearchRequest(SearchCardsRequest request);
}