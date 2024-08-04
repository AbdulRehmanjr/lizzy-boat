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

export const FormAtom = atomWithStorage('LadyForm', formInitial)
export const SnorkelingAtom = atomWithStorage('LadySnorkelingBoat', snorkeingInitial)
export const PrivateAtom = atomWithStorage('LadyPrivateBoat', privateInitial)
export const SunsetAtom = atomWithStorage('LadySunsetBoat', sunsetInitial)
export const TransferAtom = atomWithStorage('LadyTransferBoat', transferInitial)
export const FishingAtom = atomWithStorage('LadyFishingBoat', fishingInitial)
export const BoatBookingAtom = atomWithStorage('LadyBoatBooking', boatInitial)
export const PayPalDisbaleAtom = atomWithStorage<boolean>('LadyPayPalAtom', true)
export const PayPalIdAtom = atomWithStorage<string>('LadyPayPalId', '')