using Newtonsoft.Json;
using TCGDeckEditor.Server.Models;

namespace TCGDeckEditor.Server.Responses;

[Serializable]
public class SearchCardsResponse
{
    [JsonProperty("page")]
    public int Page { get; set; }
    [JsonProperty("limit")]
    public int Limit { get; set; }
    [JsonProperty("total")]
    public int Total { get; set; }
    [JsonProperty("totalPages")]
    public int TotalPages { get; set; }
    [JsonProperty("data")]
    public List<Card>? Data { get; set; }
}