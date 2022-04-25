 export const MoveData = {
    address_of_pickup : '',
    gps_of_pickup : '',
    address_of_delivery : '',
    gps_of_delivery : '',
    move_type_id : '',
    pickup_unit_number : 0,
    pickup_stairs : '',
    pickup_elevator_building : '',
    pickup_parking_info : '',
    delivery_unit_Number : 0,
    delivery_stairs : '',
    delivery_elevator_building : '',
    delivery_parking_info : '',
    date_of_pickup : '',
    time_of_pickup : '',
    move_images : '',
    weight : 0,
    no_of_helpers : 0,
    description : '',
    consumer_vehicle_id : '',
    move_bids : [],
    delivery_place_id : ''
}

export const EditMoveData = {
    address_of_pickup : '',
    gps_of_pickup : '',
    address_of_delivery : '',
    gps_of_delivery : '',
    move_type_id : '',
    date_of_pickup : '',
    time_of_pickup : '',
    move_images : [],
    weight : 0,
    no_of_helpers : 0,
    description : '',
    consumer_vehicle_id : '',
    move_bids : []
    ,move_id:''

}

export const CurrentMove = {
    move_id : '',
    provider_move_details_header : 'off',
    delivery_description: '',
    delivery_latitude: 0,
    delivery_longitude: 0,
    pickup_description: '',
    pickup_latitude: 0,
    pickup_longitude: 0,
}

export function ClearMoveData() {
    MoveData.address_of_pickup = '',
    MoveData.gps_of_pickup = '',
    MoveData.address_of_delivery = '',
    MoveData.gps_of_delivery = '',
    MoveData.move_type_id = '',
    MoveData.pickup_unit_number = 0,
    MoveData.pickup_stairs = '',
    MoveData.pickup_elevator_building = '',
    MoveData.pickup_parking_info = '',
    MoveData.delivery_unit_Number = 0,
    MoveData.delivery_stairs = '',
    MoveData.delivery_elevator_building = '',
    MoveData.delivery_parking_info = '',
    MoveData.date_of_pickup = '',
    MoveData.time_of_pickup = '',
    MoveData.move_images = '',
    MoveData.weight = 0,
    MoveData.no_of_helpers = 0,
    MoveData.description = '',
    MoveData.consumer_vehicle_id = '',
    MoveData.move_bids = []
}
