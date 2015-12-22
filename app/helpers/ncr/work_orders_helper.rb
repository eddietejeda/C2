module Ncr
  module WorkOrdersHelper
    def approver_options(excluded_users = [])
      excluded_emails = excluded_users.map(&:email_address)
      User.active.where(client_slug: "ncr").order(:email_address).pluck(:email_address) -
        Ncr::WorkOrder.all_system_approver_emails - excluded_emails
    end

    def building_options
      custom = Ncr::WorkOrder.where.not(building_number: nil).pluck('DISTINCT building_number')
      all = custom + Ncr::BUILDING_NUMBERS
      all.uniq.sort
    end

    def org_code_options(org_code = nil)
      all_orgs = Ncr::Organization.all.map(&:code_and_name) - [org_code]

      if org_code
        all_orgs = all_orgs.push(org_code)
      end

      all_orgs
    end

    def vendor_options(vendor = nil)
      all_vendors = Ncr::WorkOrder.where.not(vendor: nil).pluck('DISTINCT vendor')
      if vendor
        all_vendors.push(vendor)
      end
      all_vendors.uniq.sort_by(&:downcase)
    end

    def expense_type_radio_button(form, expense_type)
      content_tag :div, class: 'radio' do
        form.label :expense_type, value: expense_type do
          radio = form.radio_button(:expense_type, expense_type, 'data-filter-control' => 'expense-type', required: true)
          radio + expense_type
        end
      end
    end
  end
end
