FactoryGirl.define do
  factory :ncr_work_order, class: Ncr::WorkOrder do
    amount 1000
    description "Some description"
    expense_type "BA61"
    vendor "Some Vend"
    not_to_exceed false
    building_number Ncr::WorkOrder::BUILDING_NUMBERS[0]
    emergency false
    rwa_number "RWWAAA #"
    office Ncr::WorkOrder::OFFICES[0]
  end
end