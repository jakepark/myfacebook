class Api::UsersController < ApplicationController
  wrap_parameters false

  def show
    @user = User.includes(:friendships)
      .includes(posts: :comments)
      .find(params[:id])
      # .includes(:requested_friendships)
      # .includes(:pending_friends)

    if @user
      render :show
    else
      render json: ["User doesn't exist."], status: 404
    end
  end
  # def index
  #
  #   @friends = User.find(current_user.id).friends
  #   ActiveRecord::Associations::Preloader.new.preload(@friends, [{posts: :comments}, :comments])
  #   # @friends = current_user.friends
  #   render :index
  # end



  def index

    @users = User.order(:name_first)
      .includes(:friendships)
      .includes(posts: :comments)
      .includes(:requested_friendships)
    # ActiveRecord::Associations::Preloader.new.preload(@users, :friends)
    render :index
  end

  # def index
  #   @users = User.order(:name_first).includes(:friendships)
  #     .includes(posts: :comments)
  #     .includes(:requested_friendships)
  #   # ActiveRecord::Associations::Preloader.new.preload(@users, :friends)
  #   render :index
  # end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end


  def update
    @user = User.find(params[:id])
    @user.update!(user_params)
    render :show
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to root_url
  end


  private

  def user_params
    params.require(:user).permit(:email, :password, :name_first, :name_last,
      :birth_month, :birth_day, :birth_year, :gender, :avatar)
  end
end
