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
  private roomGuests: Map<number, {startDate: Date, endDate: Date, guests: Guest[]}[]>;

  addGuestToRoom(roomNumber: number, guests: Guest[], startDate: Date, endDate: Date): boolean;
  removeGuestFromRoom(roomNumber: number, guestIds: string[]): boolean;
  removeAllGuests(roomNumber: number);
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
  BLOCKED,
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
  public setRoomStatusForDates(
    roomNumber: number,
    status: RoomAvailability,
    startDate: Date,
    endDate: Date
  ): boolean;
  public getCurrentRoomStatus(roomNumber: number): RoomAvailability;
  public getRoomStatuses(
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
  private payments: Map<number, { isPayed: boolean; type: PaymentTypes, startDate: Date, endDate: Date }[]>;

  createPayment(
    roomNumber: number,
    type: PaymentTypes,
    status: boolean,
    startDate: Date,
    endDate: Date
  ): boolean {}
  changePaymentType(roomNumber: number, type: PaymentTypes, startDate: Date, endDate: Date): boolean;
  deletePayment(roomNumber: number, startDate: Date, endDate: Date): boolean;
  processPayment(roomNumber: number, type: PaymentTypes, startDate: Date, endDate: Date): boolean;
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
    // check availability of room for specific dates from _roomAvailabilityManager
    // check payment status based on type
    // add Guests if not exist using _guestsManager
    // add guests to room for specific dates using _roomsGuestsTracker
    // change availability status for specific dates using _roomAvailabilityManager
  }
  unbook(roomNumber: number, startDate: Date, endDate: Date): boolean {
    // get guests of room for given dates from _roomsGuestsTracker and delete that record
    // remove room availability record for given dates
    // remove guests
    // remove payment if exist
  }
  checkIn(roomNumber: number, guests: Guest[], endDate: Date): boolean {
    // check availability of room for given dates from _roomAvailabilityManager
    // if reserved check the guests list from _roomsGuestsTracker
    // check payment status based on type
    // add Guests if not exist using _guestsManager
    // add guests to room using _roomsGuestsTracker
    // change availability status using _roomAvailabilityManager for given dates
  }
  checkOut(roomNumber: number): boolean {
    // delete Guests using _guestsManager for current date
    // remove guests from room using _roomsGuestsTracker for current date
    // remove availability status until current date using _roomAvailabilityManager
  }
}
