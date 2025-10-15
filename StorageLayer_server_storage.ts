import { 
  type User, 
  type InsertUser,
  type Celebrity,
  type InsertCelebrity,
  type Product,
  type InsertProduct,
  type SurveyResponse,
  type InsertSurveyResponse 
} from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface defining all CRUD operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Celebrity operations
  getCelebrity(id: string): Promise<Celebrity | undefined>;
  getCelebritiesByStyle(style: string): Promise<Celebrity[]>;
  getAllCelebrities(): Promise<Celebrity[]>;
  createCelebrity(celebrity: InsertCelebrity): Promise<Celebrity>;
  
  // Product operations
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByFilters(filters: {
    style?: string;
    occasion?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Survey operations
  createSurveyResponse(response: InsertSurveyResponse): Promise<SurveyResponse>;
  getSurveyResponses(): Promise<SurveyResponse[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private celebrities: Map<string, Celebrity>;
  private products: Map<string, Product>;
  private surveyResponses: Map<string, SurveyResponse>;

  constructor() {
    this.users = new Map();
    this.celebrities = new Map();
    this.products = new Map();
    this.surveyResponses = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Celebrity methods
  async getCelebrity(id: string): Promise<Celebrity | undefined> {
    return this.celebrities.get(id);
  }

  async getCelebritiesByStyle(style: string): Promise<Celebrity[]> {
    return Array.from(this.celebrities.values()).filter(
      (celeb) => celeb.styleCategory.toLowerCase().includes(style.toLowerCase())
    );
  }

  async getAllCelebrities(): Promise<Celebrity[]> {
    return Array.from(this.celebrities.values());
  }

  async createCelebrity(insertCelebrity: InsertCelebrity): Promise<Celebrity> {
    const id = randomUUID();
    const celebrity: Celebrity = {
      ...insertCelebrity,
      id,
      createdAt: new Date(),
    };
    this.celebrities.set(id, celebrity);
    return celebrity;
  }

  // Product methods
  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByFilters(filters: {
    style?: string;
    occasion?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    return Array.from(this.products.values()).filter((product) => {
      if (filters.style && product.style !== filters.style) return false;
      if (filters.occasion && product.occasion !== filters.occasion) return false;
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      return true;
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  // Survey methods
  async createSurveyResponse(insertResponse: InsertSurveyResponse): Promise<SurveyResponse> {
    const id = randomUUID();
    const response: SurveyResponse = {
      ...insertResponse,
      id,
      createdAt: new Date(),
    };
    this.surveyResponses.set(id, response);
    return response;
  }

  async getSurveyResponses(): Promise<SurveyResponse[]> {
    return Array.from(this.surveyResponses.values());
  }
}

export const storage = new MemStorage();
