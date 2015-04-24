from django.core.urlresolvers import reverse
from model_mommy import mommy
from rest_framework import status
from rest_framework.test import APITestCase
from apps.accounts.models import User
from apps.community.models import Person
from apps.posts.models import Post, Comment


class PostListViewTests(APITestCase):
    def setUp(self):
        self.url=reverse('post-list')
        self.username = 'john@doe.com'
        self.password = '999'

    def create_community_member(self, username, password):
        person = mommy.make(Person)
        user = User.objects.create_user(username, password, person=person)
        return user

    def get_post_sample_data(self):
        return {
            'content': 'Test post'
        }

    def test_create_post(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data=self.get_post_sample_data()
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['content'], data['content'])
        self.assertEqual(response.data['author']['id'], user.person.id)

    def test_post_list(self):
        user = self.create_community_member(self.username, self.password)
        person = mommy.make(Person)
        mommy.make(Post, author=user.person, _quantity=2)
        mommy.make(Post, author=person, _quantity=3)
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)

    def test_create_post_without_authentication(self):
        data=self.get_post_sample_data()
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_post_without_person_object(self):
        User.objects.create_user(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_post_sample_data()
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_list_without_authentication(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_list_without_person_object(self):
        User.objects.create_user(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class PostViewTest(APITestCase):
    def setUp(self):
        self.username = 'john@doe.com'
        self.password = '999'

    def get_post_sample_data(self):
        return {
            'content': 'Test post'
        }

    def get_post_sample_bad_data(self):
        return {
            "author": {
                "id": 4,
                "full_name": "John Doe",
                "first_name": "John",
                "married_name": "",
                "last_name": "Doe",
                "sex": 1,
            },
            'content': 'Test post'
        }

    def create_community_member(self, username, password):
        person = mommy.make(Person)
        user = User.objects.create_user(username, password, person=person)
        return user

    def test_retrieve_post(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        post=mommy.make(Post)
        url=reverse('post',kwargs={'pk': post.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], post.content)

    def test_retrieve_post_without_authentication(self):
        post=mommy.make(Post)
        url=reverse('post',kwargs={'pk': post.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_non_existing_post(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        url=reverse('post',kwargs={'pk': 999})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_post(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_post_sample_data()
        post=mommy.make(Post, author=user.person)
        url=reverse('post',kwargs={'pk': post.id})
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], data['content'])

    def test_update_post_by_not_author(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_post_sample_data()
        post=mommy.make(Post)
        url=reverse('post',kwargs={'pk': post.id})
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_post_change_author(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        bad_data = self.get_post_sample_bad_data()
        post=mommy.make(Post, author=user.person)
        url=reverse('post',kwargs={'pk': post.id})
        response = self.client.put(url, bad_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['author']['id'],user.person.id)


    def test_update_not_existing_post(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_post_sample_data()
        post=mommy.make(Post, author=user.person)
        url=reverse('post',kwargs={'pk': 999})
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_post_without_authentication(self):
        user=self.create_community_member(self.username, self.password)
        data = self.get_post_sample_data()
        post=mommy.make(Post, author=user.person)
        url=reverse('post',kwargs={'pk': post.id})
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_post(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_post_sample_data()
        post=mommy.make(Post, author=user.person)
        url=reverse('post',kwargs={'pk': post.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_post_by_not_author(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_post_sample_data()
        post=mommy.make(Post)
        url=reverse('post',kwargs={'pk': post.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_not_existing_post(self):
        user=self.create_community_member(self.username, self.password)
        self.client.login(username=self.username, password=self.password)
        data = self.get_post_sample_data()
        post=mommy.make(Post, author=user.person)
        url=reverse('post',kwargs={'pk': 999})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_post_without_authentication(self):
        user=self.create_community_member(self.username, self.password)
        data = self.get_post_sample_data()
        post=mommy.make(Post, author=user.person)
        url=reverse('post',kwargs={'pk': post.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CommentListView(APITestCase):
    def setUp(self):
        self.username = 'john@doe.com'
        self.password = '999'
        self.user=self.create_community_member(self.username,self.password)
        self.data = self.get_comment_sample_data()

    def create_community_member(self, username, password):
        person = mommy.make(Person)
        user = User.objects.create_user(username, password, person=person)
        return user

    def get_comment_sample_data(self):
        return {
            "content": "Test comment"
        }

    def test_comment_list(self):
        self.client.login(username=self.username, password=self.password)
        post=mommy.make(Post, author=self.user.person)
        url=reverse('comment-list',kwargs={'pk': post.id})
        mommy.make(Comment, related_post=post, _quantity=3)
        mommy.make(Comment, _quantity=2)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_comment_list_not_existing_post(self):
        self.client.login(username=self.username, password=self.password)
        post=mommy.make(Post, author=self.user.person)
        url=reverse('comment-list',kwargs={'pk': 999})
        mommy.make(Comment, related_post=post, _quantity=3)
        mommy.make(Comment, _quantity=2)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_comment_list_without_authentication(self):
        post=mommy.make(Post, author=self.user.person)
        url=reverse('comment-list',kwargs={'pk': post.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_comment(self):
        self.client.login(username=self.username, password=self.password)
        post=mommy.make(Post)
        data=self.get_comment_sample_data()
        url=reverse('comment-list', kwargs={'pk': post.id})
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['content'], data['content'])
        self.assertEqual(response.data['author']['id'], self.user.person.id)
        self.assertEqual(response.data['related_post'],post.id)

    def test_create_comment_to_not_existing_post(self):
        self.client.login(username=self.username, password=self.password)
        post=mommy.make(Post)
        data=self.get_comment_sample_data()
        url=reverse('comment-list', kwargs={'pk': 999})
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_comment_without_authentication(self):
        post=mommy.make(Post, author=self.user.person)
        data=self.get_comment_sample_data()
        url=reverse('comment-list',kwargs={'pk': post.id})
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_comment_without_person_object(self):
        User.objects.create_user('john@sample.com', '001')
        self.client.login(username='john@sample.com', password='001')
        post=mommy.make(Post)
        data=self.get_comment_sample_data()
        url=reverse('comment-list', kwargs={'pk': post.id})
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list_comment_without_person_object(self):
        User.objects.create_user('john@sample.com', '001')
        self.client.login(username='john@sample.com', password='001')
        post=mommy.make(Post, author=self.user.person)
        url=reverse('comment-list',kwargs={'pk': post.id})
        mommy.make(Comment, related_post=post, _quantity=3)
        mommy.make(Comment, _quantity=2)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class CommentViewTest(APITestCase):
    def setUp(self):
        self.username = 'john@doe.com'
        self.password = '999'
        self.user = self.create_community_member(self.username,self.password)
        self.data = self.get_comment_sample_data()

    def create_community_member(self, username, password):
        person = mommy.make(Person)
        user = User.objects.create_user(username, password, person=person)
        return user

    def get_comment_sample_data(self):
        return {
            "content": "Test comment"
        }

    def get_comment_sample_bad_data(self):
        return {
            "author": {
                "id": 4,
                "full_name": "John Doe",
                "first_name": "John",
                "married_name": "",
                "last_name": "Doe",
                "sex": 1,
            },
            'content': 'Test comment'
        }

    def test_retrieve_comment(self):
        self.client.login(username=self.username, password=self.password)
        comment=mommy.make(Comment)
        url=reverse('comment',kwargs={'pk': comment.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], comment.content)

    def test_retrieve_comment_without_authentication(self):
        comment=mommy.make(Comment)
        url=reverse('comment',kwargs={'pk': comment.id})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_non_existing_comment(self):
        self.client.login(username=self.username, password=self.password)
        url=reverse('comment',kwargs={'pk': 999})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_comment(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_comment_sample_data()
        comment=mommy.make(Comment, author=self.user.person)
        url=reverse('comment',kwargs={'pk': comment.id})
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], data['content'])

    def test_update_comment_by_not_author(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_comment_sample_data()
        comment=mommy.make(Comment)
        url=reverse('comment',kwargs={'pk': comment.id})
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_comment_change_author(self):
        self.client.login(username=self.username, password=self.password)
        bad_data = self.get_comment_sample_bad_data()
        comment=mommy.make(Comment, author=self.user.person)
        url=reverse('comment',kwargs={'pk': comment.id})
        response = self.client.put(url, bad_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['author']['id'],self.user.person.id)

    def test_update_not_existing_comment(self):
        self.client.login(username=self.username, password=self.password)
        data = self.get_comment_sample_data()
        url=reverse('comment',kwargs={'pk': 999})
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_comment_without_authentication(self):
        data = self.get_comment_sample_data()
        comment=mommy.make(Comment, author=self.user.person)
        url=reverse('comment',kwargs={'pk': comment.id})
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_comment(self):
        self.client.login(username=self.username, password=self.password)
        comment=mommy.make(Comment, author=self.user.person)
        url=reverse('comment',kwargs={'pk': comment.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_comment_by_not_author(self):
        self.client.login(username=self.username, password=self.password)
        comment=mommy.make(Comment)
        url=reverse('comment',kwargs={'pk': comment.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_not_existing_comment(self):
        self.client.login(username=self.username, password=self.password)
        url=reverse('comment',kwargs={'pk': 999})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_comment_without_authentication(self):
        comment=mommy.make(Comment, author=self.user.person)
        url=reverse('comment',kwargs={'pk': comment.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)