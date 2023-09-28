import unittest
import requests

class APITests(unittest.TestCase):
    base_url = 'http://127.0.0.1:3000'

    def test_random_rows(self):
        url = f'{self.base_url}/random-rows'
        response = requests.get(url)
        response_data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data['random_rows']), 6)

    def test_players(self):
        url = f'{self.base_url}/players'
        response = requests.get(url)
        self.assertEqual(response.status_code, 200)

    def test_teammate_search(self):
        #Established teammates vs disjoint
        #8471215: Malkin
        #8471675: Crosby
        #8473512: Giroux

        url1 = f'{self.base_url}/search_teammates/8471215/8471675'
        url2 = f'{self.base_url}/search_teammates/8471215/8473512'

        response1 = requests.get(url1)
        response1 = response1.json()
        response2 = requests.get(url2)
        response2 = response2.json()

        self.assertEqual(response1['games'], 721) #actual value is higher, this is since 2011-2012
        self.assertEqual(response2['games'], 0)


if __name__ == '__main__':
    unittest.main()
