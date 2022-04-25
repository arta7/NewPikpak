import { LoginData } from "../Redux/LoginData";

export const APIMaster = 
{
    URL:'https://webapp.pikpakapp.com',

    GURL: 'https://maps.googleapis.com',
    
    Auth : {
        Register : '/api/v1/register',
        Login : '/api/v1/login',
        Logout : '/api/v1/logout'
    },

    State : {
        GetStateList : '/api/v1/state-cities',
        GetCitiesList : '/api/v1/get-cities/'
    },

    User : {
        ForgotPassword : '/api/v1/forgot-password',
        ChangePassword : '/api/v1/change-password',
        GetUserStatus : '/api/v1/get-user-status/',
        GetUserProfile : '/api/v1/user/',
        SetUserProfile : '/api/v1/user/',
        activation:'/api/v1/activation'
    },

    Move : {
        GetMoveType : '/api/v1/move-type',
        CreateMove : '/api/v1/move',
        UpdateMove : '/api/v1/move-update',
        GetMyQoutesList : '/api/v1/my-quotes/',
        DeleteMove : '/api/v1/move/',
        GetMove : '/api/v1/move/',
        GetAvailableMoveList : '/api/v1/moves/',
        GetWorkloadList : '/api/v1/workload/',
        ActionOnMove:'/api/v1/action-on-move'
    },

    PaymentCard : {
        AddPaymentCard : '/api/v1/payment-card',
        PaymentCardList : '/api/v1/my-payment-cards/',
        SetAsDefaultCard : '/api/v1/set-default-payment-card',
        DeleteCard : '/api/v1/payment-card/',
        CompletePayment:'/api/v1/payment-transaction',
        paywithvaultedcard:'/api/v1/pay-with-vaulted-card',
        Payment:'/payment'
    },

    Vehicle : {
        GetVehicleList : '/api/v1/vehicle',
        GetColorList : '/api/v1/colors',
        GetVehicleMakeList : '/api/v1/make-models',
        GetVehicleModelList : '/api/v1/get-models/'

    },

    BankAccount : {
        GetBankAccount : '/api/v1/get-bank-accounts',
        SetBankAccount : '/api/v1/add-bank-account',
        EditBankAccount : '/api/v1/edit-bank-account',
        DeleteBankAccount : '/api/v1/delete-bank-account'
    },

    Equipment : {
        GetEquipmentList : '/api/v1/equipments-list'
    },

    ProfessionalDetail : {
        SetProfessionalDetail : '/api/v1/professional-detail',
        GetProfessionalDetail : '/api/v1/my-professional-details/'
    },

    NotificationsSetting : {
        SetNotificationsSetting : '/api/v1/set-notification-status',
        GetPushNotifications:'/api/v1/get-push-notifications/',
        ReadAllNotifications:'/api/v1/read-all-notifications/'

    },

    Setting : {
        GetOptionSetting : '/api/v1/option-settings'
    },

    GooglePlace : {
        GetLatLng : '/maps/api/place/details/json?placeid={placeid}&key={key}'
    },

    Bid : {
        SetBid : '/api/v1/bid',
        GetMyBidsList : '/api/v1/my-bids/',
        CancelActiveBid : '/api/v1/cancel-active-bid',
        CancelBid : '/api/v1/cancel-bid',
        ActionOnBid : '/api/v1/action-on-bid'
        
    },

    ChatMessage : {
        CreateMessage : '/api/v1/chat-message',
        GetMessageList : '/api/v1/chat-messages'
    }

    

// Account:{
//      Login:'/api/Account/Login',
//      Register:'',
//      IsActive:'/api/Account/IsUserActive',
//      CheckTokenIsValid:'/api/Account/CheckTokenIsValid',
    
// },

// Home:{
//      GetAllServiceTypes:'/api/Home/GetAllServiceTypes',
//      GetAllProviderCount:'/api/Home/GetAllProviderCount',
//      GetAllServicesCount:'/api/Home/GetAllServicesCount',
//      GetAllUsersCount:'/api/Home/GetAllUsersCount',
//      PopularService:'/api/ServiceType/PopularService'
// },
// Profile:{
//      GetUserById:'/api/Profiles/GetUserById'


     
// },
// Services:{
//      GetUsersCategoryServiceById:'/api/ServiceType/GetUsersCategoryServiceById',
//      GetUsersServiceById:'/api/ServiceType/GetUsersServiceById',
//      SearchService:'/api/ServiceType/SearchService',
//      GetUsersServiceDetailsById:'/api/ServiceType/GetUsersServiceDetailsById',
//      GetAllServiceTypes:'/api/Home/GetAllServiceTypes',
//      AddChatServiceForUser:'/api/userService/AddChatServiceForUser',
//      GetAllMyServiceCategory:'/api/ServiceType/GetAllMyServiceCategory',
//      GetAllMyService:'/api/ServiceType/GetAllMyService',
//      GetServiceDetailsById:'/api/ServiceType/GetServiceDetailsById'
     
// },
// MyProfile:{
//      GetProfile:'/api/Profiles/GetProfile'
// },
// Category:{
//      GetAll:'/api/Category/GetAll',
//      GetAllNotSubcategoryByServiceId:'​/api​/Category​/GetAllNotSubcategoryByServiceId',
//      GetAllSubcategoryByServiceId:'/api/Category/GetAllSubcategoryByServiceId',

// },
// Transaction:{
//      GetWalteBalance:'/api/Transactoin/GetWalteBalance',
//      GetAlltransactions:'api/Transactoin/GetAlltransactions',
//      //'​/api​/Transactoin​/GetAlltransactionsForUser',
//      NormalWithDrawl:'/api/Transactoin/NormalWithDrawl',
//      NormalDeposit:'/api/Transactoin/NormalDeposit'
// },
// Card:
// {
//      GetWalletInventory:'/api/Card/GetWalletInventory',
//      GetAllCards:'/api/Card/GetAllCards',
//      GetCardById:'/api/Card/GetCardById',
//      AddCard:'/api/Card/AddCard',
//      UpdateCard:'/api/Card/UpdateCard',
//      DeleteCard:'/api/Card/DeleteCard'
// },
// Payment:{
//      Payment:'/api/Payment/Payment'
// },
// ChatSystem:{
//      GetAllChatsList:'/api/ChatSystem/GetAllChatsList'
// },
// Request:{
//     GetAllMyRequests:'​/api​/RequestV2​/GetAllMyRequests'
// }





}