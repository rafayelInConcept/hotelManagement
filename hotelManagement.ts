abstract class Room {
  constructor(
    protected type: number,
    protected price: number,
    protected roomNumber: number,
    protected roomSize: number,
    protected floor: number
  ) {}

  public getType(): string;
  public getRoomNumber(): number;
  public getPrice(): number;
  public getRoomSize(): number;
  public getFloor(): number;
}

class SingleRoom extends Room {
  constructor(roomNumber: number, floor: number) {}
}
class DoubleRoom extends Room {
  constructor(roomNumber: number, floor: number) {}
}
class DeluxeRoom extends Room {
  constructor(roomNumber: number, floor: number) {}
}
class SuiteRoom extends Room {
  constructor(roomNumber: number, floor: number) {}
}

class Guest {
  constructor(
    protected Id: string,
    protected name: string,
    protected surname: string,
    protected middleName: string,
    protected age: number
  ) {}

  public getId(): string {}
  public getName(): string {}
  public getSurname(): string {}
  public getMiddleName(): string {}
  public getAge(): number {}
}

class GuestsManager {
  private guests: Map<string, Guest>;

  addGuest(guest: Guest): boolean;
  removeGuest(guestId: string): boolean;
  getGuests(): Guest[];
}

class RoomsGuestsTracker {
  private roomGuests: Map<number, Map<string, Guest>>;

  addGuestToRoom(roomNumber: number, guests: Guest[]): boolean;
  removeGuestFromRoom(roomNumber: number, guestIds: string[]): boolean;
  removeAllGuests(roomNumber: number, guests: Guest[]);
}

// using RoomNumberTracker create room numbers in ascending order;
class RoomNumberTracker {
  private static _instance: RoomNumberTracker;
  private _lastRoomNumber: number;

  public getLastRoomNumber(): number;
  public getNewRoomNumber(): number;
  static get Instance(): RoomNumberTracker;
}

enum RoomAvailability {
  AVAILABLE,
  CHECKED_IN,
  RESERVED,
}

// RoomAvailabilityManager is a tracker for room availability for specific periods
class RoomAvailabilityManager {
  private roomAvailabilityTracker: Map<
    number,
    {
      status: RoomAvailability;
      startDate: Date;
      endDate: Date;
    }[]
  >;
  public setRoomStatus(
    roomNumber: number,
    status: RoomAvailability,
    startDate: Date,
    endDate: Date
  ): boolean;
  public getCurrentRoomStatus(roomNumber: number): RoomAvailability;
  public getRoomStatus(
    roomNumber: number,
    startDate?: Date,
    endDate?: number
  ): RoomAvailability;
  public changeStatusForDates(
    roomNumber: number,
    status: RoomAvailability,
    startDate: Date,
    endDate: Date
  );
  public removeStatusForDates(
    roomNumber: number,
    startDate: Date,
    endDate: Date
  );
}

// service for CRD rooms
// instance can be used by hotel staff to manage rooms 
class RoomService {
  private _rooms: Map<number, Room>;

  public createRoom(room: Room): boolean {
    // wait for the room which will instantiate from one of the room types and assign a roomNumber using RoomNumberTracker
    // save room in rooms map with roomNumber as key and room as value
  }
  public getRoom(roomNumber: number): Room {}
  public removeRoom(roomNumber: number): boolean {}
  public getAllRooms(): Room[] {}
}

// Payments
enum PaymentTypes {
  CASH,
  CREDIT_CARD,
  ONLINE,
}

class PaymentTracker {
  private payments: Map<number, { isPayed: boolean; type: PaymentTypes }>;

  createPayment(
    roomNumber: number,
    type: PaymentTypes,
    status: boolean
  ): boolean {}
  changePaymentType(roomNumber: number, type: PaymentTypes): boolean;
  processPayment(roomNumber: number, type: PaymentTypes): boolean;
}

class HotelManagement {
  constructor(
    private _roomService: RoomService,
    private _roomAvailabilityManager: RoomAvailabilityManager,
    private _guestsManager: GuestsManager,
    private _roomsGuestsTracker: RoomsGuestsTracker,
    private _paymentTracker: PaymentTracker
  );

  getAllAvailableRoms(startDate: Date, endDate: Date): Room[] {
    // iterate through all available rooms from _roomService
    // check their availability for current dates using _roomAvailabilityManager
  }
  book(
    roomNumber: number,
    guest: Guest[],
    startDate: Date,
    endDate: Date
  ): boolean {
    // check payment status based on type
    // check availability of room from _roomService
    // add Guests if not exist using _guestsManager
    // add guests to room using _roomsGuestsTracker
    // change availability status using _roomAvailabilityManager
  }
  checkIn(roomNumber: number, guests: Guest[], until: Date): boolean {
    // check availability of room from _roomService
    // check payment status based on type
    // add Guests if not exist using _guestsManager
    // add guests to room using _roomsGuestsTracker
    // change availability status using _roomAvailabilityManager
  }
  checkOut(roomNumber: number): boolean {
    // delete Guests using _guestsManager
    // remove guests from room using _roomsGuestsTracker
    // remove availability status until current date using _roomAvailabilityManager
  }
}
