using System.Threading.Tasks;
using Core.Entities;
using Order = Core.Entities.OrderAggregate.Order;

namespace Core.Interfaces
{
    public interface IPaymentService
    {
         Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
         Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
         Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
    }
}