import { atomWithStorage } from 'jotai/utils'

const boatInitial: BoatBookingTypeProps = {
    boatType: undefined,
    timeSlot: undefined,
    daySlot: undefined,
    date: undefined,
    price: 0,
    adult: undefined,
    children: undefined,
    infants: undefined,
}

const fishingInitial: FishingBookingProps = {
    boatType: undefined,
    timeSlot: undefined,
    daySlot: undefined,
    date: undefined,
    price: 0,
    adult: undefined,
    infants: 0,
}

const transferInitial: TransferBookingProps = {
    transferType: undefined,
    startTime:undefined,
    endTime:undefined,
    blockTime:undefined,
    date: undefined,
    duration:0,
    price: 0,
    adult: 0,
    infants: 0,
}

const sunsetInitial: SunsetBookingProps = {
    date: undefined,
    price: 0,
    adult: 0,
    infants: 0,
}

const privateInitial: PrivateBookingProps = {
    timeSlot: undefined,
    daySlot: undefined,
    date: undefined,
    price: 0,
    adult: undefined,
    infants: 0,
}

const snorkeingInitial: SnorkelingBookingProps = {
    timeSlot: undefined,
    daySlot: undefined,
    date: undefined,
    price: 0,
    adult: undefined,
    infants: 0,
}

const formInitial: FormProps = {
    firstName: 'none',
    lastName: 'none',
    email: 'none',
    phone: 'none',
    extra: 'none',
    information: 'none',
    guesthouse: 'none'
}

export const FormAtom = atomWithStorage('LizzyForm', formInitial)
export const SnorkelingAtom = atomWithStorage('LizzySnorkelingBoat', snorkeingInitial)
export const PrivateAtom = atomWithStorage('LizzyPrivateBoat', privateInitial)
export const SunsetAtom = atomWithStorage('LizzySunsetBoat', sunsetInitial)
export const TransferAtom = atomWithStorage('LizzyTransferBoat', transferInitial)
export const FishingAtom = atomWithStorage('LizzyFishingBoat', fishingInitial)
export const BoatBookingAtom = atomWithStorage('LizzyBoatBooking', boatInitial)
export const PayPalDisbaleAtom = atomWithStorage<boolean>('LizzyPayPalAtom', true)
export const PayPalIdAtom = atomWithStorage<string>('LizzyPayPalId', '')