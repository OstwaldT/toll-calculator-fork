export enum VehicleType {
    'Car',
    'Truck',
    'Bus',
    'Motorbike',
    'Tractor',
    'Emergency',
    'Diplomat',
    'Foreign',
    'Military',
    'Other',
}

export const TollExemptVehicles = [
    VehicleType.Motorbike,
    VehicleType.Tractor,
    VehicleType.Emergency,
    VehicleType.Diplomat,
    VehicleType.Foreign,
    VehicleType.Military,
]

export type Vehicle = {
    id: string
    type: VehicleType
}
