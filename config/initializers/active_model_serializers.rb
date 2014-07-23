ActiveSupport.on_load(:active_model_serializers) do
  # Disable root element for all serializers (except ArraySerializer)
  ActiveModel::Serializer.root = false

  # Disable root element for ArraySerializer
  ActiveModel::ArraySerializer.root = false
end
