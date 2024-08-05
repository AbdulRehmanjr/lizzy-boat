type BoatBookingTypeProps = {
    boatType: string | undefined
    timeSlot: string | undefined
    daySlot: string | undefined
    date: string | undefined
    price: number
    adult: number | undefined
    children: number | undefined
    infants: number | undefined
}

type FishingBookingProps = {
    boatType: string | undefined
    timeSlot: string | undefined
    daySlot: string | undefined
    date: string | undefined
    price: number
    adult: number | undefined
    infants: number
}

type TransferBookingProps = {
    transferType: string | undefined
    startTime: string | undefined
    endTime: string | undefined
    blockTime: string | undefined
    date: string | undefined
    duration: number
    price: number
    adult: number
    infants: number
}

type SunsetBookingProps = {
    date: string | undefined
    price: number
    adult: number
    infants: number
}

type PrivateBookingProps = {
    timeSlot: string | undefined
    daySlot: string | undefined
    date: string | undefined
    price: number
    adult: number | undefined
    infants: number
}

type SnorkelingBookingProps = {
    timeSlot: string | undefined
    daySlot: string | undefined
    date: string | undefined
    price: number
    adult: number | undefined
    infants: number
}

type FormProps = {
    firstName: string
    lastName: string
    email: string
    phone: string
    information: string
    extra: string
    guesthouse: string
}

type BookingProps = Partial<{
    boatType?: string;
    timeSlot?: string;
    daySlot?: string;
    date?: string;
    price?: number;
    adult?: number;
    children?: number;
    infants?: number;
    transferType?: string;
    startTime?: string;
    endTime?: string;
    blockTime?: string;
    duration?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    information?: string;
    extra?: string;
    guesthouse?: string;
}>;
