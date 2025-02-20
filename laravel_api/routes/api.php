<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClaController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\CacheController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\AdminChartController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\SettlementController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\QuestionnaireController;
use App\Http\Controllers\DeletedBuildingController;
use App\Http\Controllers\Dashboard\InfoBoxController;
use App\Http\Controllers\QuestionnaireListController;
use App\Http\Controllers\QuestionnaireActionController;
use App\Http\Controllers\QuestionnaireControlController;
use App\Http\Controllers\AdminSelfRegistrationController;
use App\Http\Controllers\QuestionnaireTransferController;
use App\Http\Controllers\Dashboard\AdminInformationController;
use App\Http\Controllers\Dashboard\RegionInformationController;
use App\Http\Controllers\Dashboard\SectorInformationController;
use App\Http\Controllers\Dashboard\MunicipalInformationController;
use App\Http\Controllers\Dashboard\SupervisorInformationController;
use App\Http\Controllers\ExportDailyDataController;
use App\Http\Controllers\RestoreBaseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix('auth')->group(function () {
    Route::post('login', LoginController::class);
    Route::post('logout', LogoutController::class)->middleware('auth:api');
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [StaffController::class, 'getUser']);
    Route::get('/supervisor/fetch_staff', [StaffController::class, 'getSupervisorStaff']);
    Route::post('/fetch_staff', [StaffController::class, 'getStaff']);
    Route::post('/fetch_admin_staff', [StaffController::class, 'fetchAdminStaff']);
    Route::post('/add_staff', [StaffController::class, 'addStaff']);
    Route::post('/update_staff', [StaffController::class, 'updateStaff']);
    Route::post('/get_staff_available_codes', [StaffController::class, 'getStaffAvailableCodes']);
    Route::post('/fetch_staff_info' , [StaffController::class, 'fetchStaffInfo']);
    Route::get('/export_staff', [StaffController::class, 'exportStaff']);
    Route::get('/export_all_staff', [StaffController::class, 'exportAllStaff']);
    Route::get('/export_finance_staff_local', [StaffController::class, 'exportFinanceStaffLocal']);
    Route::get('/export_finance_staff_respodent', [StaffController::class, 'exportFinanceStaffRespodent']);
    Route::post('/delete_staff', [StaffController::class, 'deleteStaff']);
    Route::post('/get_multi_users', [StaffController::class, 'getMultiUsers']);
    Route::get('/get_imei_codes', [StaffController::class, 'getImeiCodes']);

    Route::get('/fetch_building', [BuildingController::class, 'getBuildings']);
    Route::get('/fetch_deleted_building', [DeletedBuildingController::class, 'getDeletedBuildings']);
    Route::get('/search_deleted_building', [DeletedBuildingController::class, 'searchDeletedBuilding']);
    Route::post('/update_deleted_building_status', [DeletedBuildingController::class, 'updateDeletedBuildingStatus']);
    Route::get('/search_building', [BuildingController::class, 'searchBuilding']);
    Route::get('/filter_building', [BuildingController::class, 'filterBuildings']);
    Route::get('/filter_building_questionnaire', [BuildingController::class, 'filterBuildingQuestionnaire']);
    Route::get('/buildings_information', [BuildingController::class, 'buildingsInformation']);
    Route::post('/delete_building', [BuildingController::class, 'deleteBuilding']);
    Route::post('/refuse_delete_building', [BuildingController::class, 'refuseDeleteBuilding']);

    Route::get('/fetch_questionnaires_list', [QuestionnaireListController::class, 'fetchQuestionnaireList']);
    // Route::get('/questionnaires_filter', [QuestionnaireListController::class, 'getQuestionnairesFilter']);
    Route::get('/fetch_questionnaire_active_time', [QuestionnaireListController::class, 'fetchQuestionnaireActiveTime']);
    Route::get('/scope_filter_questionnaires', [QuestionnaireListController::class, 'scopeFilterQuestionnaires']);


    Route::get('/fetch_full_questionnaire_by_house_code', [QuestionnaireTransferController::class, 'fetchAllQuestionnaires']);
    Route::post('/transfer_questionnaires', [QuestionnaireTransferController::class, 'transferQuestionnaire']);

    Route::get('/fetch_questionnaire_full_data', [QuestionnaireController::class, 'fetchQuestionnaireFullData']);
    Route::get('/fetch_dwelling_information', [QuestionnaireController::class, 'fetchDwellingInformation']);
    Route::get('/fetch_household', [QuestionnaireController::class, 'fetchHousehold']);
    Route::get('/fetch_personal_information', [QuestionnaireController::class, 'fetchPersonal']);
    Route::post('/update_person_view', [PersonController::class, 'updatePersonView']);
    Route::get('/fetch_agriculture', [QuestionnaireController::class, 'fetchAgriculture']);
    Route::get('/fetch_fields', [QuestionnaireController::class, 'fetchFields']);

    Route::get('/fetch_points', [MapController::class, 'fetchPoints']);
    Route::get('/fetch_municipal_points', [MapController::class, 'getMunicipalPoints']);
    Route::get('/fetch_questionnaire_avg_coordinate', [MapController::class, 'getQuestionnaireAvgCoordinate']);
    // Ensure you close your route groups properly in your actual code

    // questionnaire action
    Route::post('/questionnaire_confirm', [QuestionnaireActionController::class, 'confirm']);
    Route::post('/questionnaire_refuse', [QuestionnaireActionController::class, 'refuse']);
    Route::post('/questionnaire_delete', [QuestionnaireActionController::class, 'delete']);


    Route::get('/fetch_settlement_cla', [ClaController::class, 'getSettlementCla']);

    // dashboard information
    Route::get('/fetch_admin_information', [AdminInformationController::class, 'fetchAdminInformation']);
    Route::get('/fetch_admin_info_box', [AdminInformationController::class, 'getAdminInfoBox']);
    Route::get('/fetch_user_info_box', [InfoBoxController::class, 'getUserInfoBox']);
    Route::get('/filter_admin_info_box', [AdminInformationController::class, 'filterInfoBox']);
    Route::get('/fetch_admin_self_registration', [AdminSelfRegistrationController::class, 'fetchAdminSelfRegistration']);
    Route::get('/filter_admin_self_registration', [AdminSelfRegistrationController::class, 'filterAdminSelfRegistration']);

    Route::get('/fetch_region_information', [RegionInformationController::class, 'fetchRegionInformation']);

    Route::get('/fetch_municipal_information', [MunicipalInformationController::class, 'fetchInformation']);

    Route::get('/fetch_sector_information', [SectorInformationController::class, 'fetchSectorInformation']);

    Route::get('/fetch_supervisor_information', [SupervisorInformationController::class, 'fetchSupervisorInformation']);

    Route::get('/fetch_questionnaire_control_info', [QuestionnaireControlController::class, 'fetchQuestionnaireControlInfo']);
    Route::get('/fetch_admin_questionnaire_control_info', [QuestionnaireControlController::class, 'fetchAdminQuestionnaireControlInfo']);
    Route::get('/fetch_questionnaire_control_info_next_level', [QuestionnaireControlController::class, 'fetchQuestionnaireControlInfoNextLevel']);
    Route::post('/fetch_respodents', [QuestionnaireControlController::class, 'fetchQuestionaireByFirstName']);

    // admin chart
    // progress chart
    Route::get('/fetch_admin_progress_chart', [AdminChartController::class, 'fetchAdminProgressChart']);
    Route::get('/filter_admin_progress_chart', [AdminChartController::class, 'filterAdminProgressChart']);
    //private holder chart
    Route::get('/fetch_admin_other_chart', [AdminChartController::class, 'fetchAdminOtherChart']);
    Route::get('/filter_admin_other_chart', [AdminChartController::class, 'filterAdminOtherChart']);

    Route::get('/fetch_admin_days_info_chart', [AdminChartController::class, 'fetchAdminDaysInfoChart']);
    Route::get('/filter_admin_days_info_chart', [AdminChartController::class, 'filterAdminDaysInfoChart']);

    Route::get('/fetch_settlement_information', [SettlementController::class, 'fetchSettlementInformation']);
    // delete cache
    Route::post('/delete_user_cache', [CacheController::class, 'deleteUserCache']);

    // restore base
    Route::post('/get_user_to_restore_base', [RestoreBaseController::class, 'getUserToRestoreBase']);
    Route::post('/restore_base', [RestoreBaseController::class, 'restoreBase']);
    // call center self registration
    Route::post('/find_self_registration_user', [AdminSelfRegistrationController::class, 'findSelfRegistrationUser']);
    Route::post('/delete_completion_code', [AdminSelfRegistrationController::class, 'deleteCompletionCode']);

    // EXPORT DAILY REPORT
    Route::get('/get_sectors', [ExportDailyDataController::class, 'getSectors']);
    Route::get('/export_daily_report', [ExportDailyDataController::class, 'exportDailyReport']);
});
