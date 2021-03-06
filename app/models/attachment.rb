class Attachment < ActiveRecord::Base
  include S3File
  has_paper_trail class_name: "C2Version"

  validates_attachment_content_type :file, content_type: [
    %r{\Aapplication\/vnd\.ms-.*},
    %r{\Aapplication\/vnd\.oasis.*},
    %r{\Aapplication\/vnd\.openxmlformats.*},
    "application/msword",
    "application/pdf",
    %r{\Aimage\/p?jpeg\z},
    %r{\Aimage\/(x-)?png\z},
    "image/tiff"
  ]

  belongs_to :proposal
  belongs_to :user

  validates :file, presence: true
  validates :proposal, presence: true
  validates :user, presence: true

  validates_attachment :file, size: { in: 0..30.megabytes }

  scope :with_users, -> { includes :user }

  # Default url for attachments expires after 10 minutes
  def url
    file.expiring_url(10 * 60)
  end
end
