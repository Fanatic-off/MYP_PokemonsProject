import { CardFullResponse } from '../models/ResponseModels/CardFullResponse.tsx';
import { CardShortResponse } from '../models/ResponseModels/CardShortResponse.tsx';
import { LoginRequest } from '../models/RequestModels/LoginRequest.tsx';
import { SignUpRequest } from '../models/RequestModels/SignUpRequest.tsx';
import { setItem } from '../services/localStorageService.tsx';
import { accessApiToken } from '../store/localStorageKeys.tsx';
import {
  PokemonServiceBaseUrl,
  PokemonServiceApiKey,
  AuthorizeServiceBaseUrl,
  AuctionServiceBaseUrl,
} from './constants.tsx';

const baseGet = (url: string) => {
  return fetch(PokemonServiceBaseUrl + url, {
    method: 'GET',
    headers: { 'X-Api-Key': PokemonServiceApiKey },
  });
};

export const addUser = async (user: SignUpRequest) => {
  try {
    const response = await fetch(AuthorizeServiceBaseUrl + 'users/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    console.log(response.ok);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const logIn = async (loginRequest: LoginRequest) => {
  try {
    const response = await fetch(AuthorizeServiceBaseUrl + 'users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    });

    console.log(response.ok);
    if (response.ok) {
      const data = await response.json();
      setItem<string>(accessApiToken, data.accessToken);
      window.location.assign('/auction-market');
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const AddCardToUser = async (cardId: string): Promise<boolean> => {
  try {
    const userCard = {
      userId: 5,
      cardId: cardId,
      typeId: 1,
    };
    const response = await fetch(AuctionServiceBaseUrl + `user/card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCard),
    });
    return response.ok;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return false;
  }
};

export const getCards = async (
  page: number,
  pageSize: number
): Promise<CardShortResponse[]> => {
  try {
    const response = await baseGet(
      `cards?page=` + page + `&pageSize=` + pageSize
    );
    const data = await response.json();
    return data.data as CardShortResponse[];
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
};

export const getCardById = async (
  id: string
): Promise<CardFullResponse | undefined> => {
  try {
    const response = await baseGet(`cards/` + id);
    const data = await response.json();
    return data.data as CardFullResponse;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return;
  }
};

export const getCardsByIds = async (ids: string[]): Promise<PokemonDto[]> => {
  try {
    const cardPromises = ids.map((id) => getCardById(id));
    const cards = await Promise.all(cardPromises);
    return cards.filter((card) => card !== undefined) as PokemonDto[];
  } catch (error) {
    console.error('Error fetching cards by IDs:', error);
    return [];
  }
};
