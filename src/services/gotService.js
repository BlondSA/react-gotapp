export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  getResource = async (url) => {
    const response = await fetch(`${this._apiBase}${url}`);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    return await response.json();
  };

  getAllCharacters = async () => {
    const result = await this.getResource("/characters?page=5&pageSize=10");
    return result.map(this._transformCharacter);
  };

  getAllHouses = async () => {
    const result = await this.getResource("/houses");
    return result.map(this._transformHouse);
  };

  getAllBooks = async () => {
    const result = await this.getResource("/books/");
    return result.map(this._transformBook);
  };

  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  };

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  };

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  };

  isSet(data) {
    if (data) {
      return data;
    } else {
      return "No data :(";
    }
  }

  _extraId(item) {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }

  _transformCharacter = (character) => {
    return {
      id: this._extraId(character),
      name: this.isSet(character.name),
      gender: this.isSet(character.gender),
      born: this.isSet(character.born),
      died: this.isSet(character.died),
      culture: this.isSet(character.culture),
    };
  };

  _transformHouse = (house) => {
    return {
      id: this._extraId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(house.ancestralWeapons),
    };
  };

  _transformBook = (book) => {
    return {
      id: this._extraId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publisher: this.isSet(book.publisher),
      released: this.isSet(book.released),
    };
  };
}
