﻿using Microsoft.AspNetCore.Mvc;
using TCGDeckEditor.Server.Logic.Processors;
using TCGDeckEditor.Server.Models;
using TCGDeckEditor.Server.Requests;
using TCGDeckEditor.Server.Responses;

namespace TCGDeckEditor.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DeckController : ControllerBase
{
    private readonly IDeckProcessor deckProcessor;
    
    public DeckController(IDeckProcessor deckProcessor)
    {
        this.deckProcessor = deckProcessor;
    }

    [HttpPost]
    [Route("save")]
    public async Task<bool> SaveDeck(SaveDeckRequest request)
    {
        try
        {
            await this.deckProcessor.SaveDeck(request);
            
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    [HttpGet]
    [Route($"decks/{{userId}}")]
    public async Task<List<GetDecksResponse>> GetDecks(int userId)
    {
        try
        {
            var decks = await this.deckProcessor.GetDecks(userId);
            return decks;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}